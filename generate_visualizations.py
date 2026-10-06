import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score, precision_recall_fscore_support

# Configure styles
sns.set_theme(style="whitegrid", palette="muted")
plt.rcParams.update({'font.sans-serif': 'Arial', 'font.family': 'sans-serif'})
os.makedirs("images", exist_ok=True)

# 1. Load Data
raw_df = pd.read_csv("dcs_student_data.csv")

# Anomaly recording for narrative
anomaly_stats = {
    "total_rows": len(raw_df),
    "duplicate_rows": int(raw_df.duplicated().sum()),
    "missing_per_col": raw_df.isnull().sum().to_dict(),
    "negative_attendance": int((raw_df["Attendance (%)"] < 0).sum()),
    "over_100_attendance": int((raw_df["Attendance (%)"] > 100).sum()),
    "negative_age": int((raw_df["Age"] < 0).sum()),
    "over_60_age": int((raw_df["Age"] > 60).sum()),
}

# 2. Clean Data
df = raw_df.drop_duplicates().copy()

# Text & category cleaning
df["Department"] = df["Department"].astype(str).str.strip().replace({
    "CS": "Computer Science",
    "Math": "Mathematics",
    "BUSINESS": "Business",
    "engineering": "Engineering"
})
df["Gender"] = df["Gender"].astype(str).str.strip().str.title()
df["math_score"] = pd.to_numeric(df["math_score"].astype(str).str.strip(), errors="coerce")

# Range boundary clipping for domain validity
df["Attendance (%)"] = df["Attendance (%)"].clip(0, 100)
df["Midterm_Score"] = df["Midterm_Score"].clip(0, 100)
df["Final_Score"] = df["Final_Score"].clip(0, 100)
df["Age"] = df["Age"].apply(lambda x: np.nan if (x < 15 or x > 60) else x)

# Impute missing values with median
num_impute_cols = [
    "Attendance (%)", "Age", "Midterm_Score", "Final_Score",
    "Assignments_Avg", "Quizzes_Avg", "Participation_Score",
    "Projects_Score", "math_score"
]
for col in num_impute_cols:
    df[col] = df[col].fillna(df[col].median())

# Derived academic features
df["Core_Subjects_Avg"] = df[["math_score", "reading_score", "writing_score", "science_score"]].mean(axis=1)
df["Overall_Marks"] = (0.6 * df["Total_Score"] + 0.4 * df["Core_Subjects_Avg"]).round(2)

# 3. Define Risk Criteria
def classify_risk(row):
    att = row["Attendance (%)"]
    marks = row["Overall_Marks"]
    if att < 65 or marks < 60 or (att < 75 and marks < 68):
        return "HIGH"
    elif att < 80 or marks < 75:
        return "MEDIUM"
    else:
        return "LOW"

df["Risk"] = df.apply(classify_risk, axis=1)

print(f"Cleaned dataset: {len(df)} records.")
print("Risk distribution:\n", df["Risk"].value_counts())

# ----------------- Visualizations -----------------

# Chart 1: Attendance vs Overall Marks colored by Risk
plt.figure(figsize=(10, 6))
palette = {"HIGH": "#e74c3c", "MEDIUM": "#f39c12", "LOW": "#2ecc71"}
sns.scatterplot(
    data=df.sample(2000, random_state=42), 
    x="Attendance (%)", 
    y="Overall_Marks", 
    hue="Risk", 
    palette=palette,
    alpha=0.6,
    s=40
)
plt.axvline(75, color="#c0392b", linestyle="--", linewidth=1.5, label="Mandatory Attendance (75%)")
plt.axhline(60, color="#d35400", linestyle="--", linewidth=1.5, label="Passing Marks Threshold (60)")
plt.title("Relationship Between Attendance and Academic Marks by Risk Level", fontsize=14, fontweight="bold", pad=12)
plt.xlabel("Attendance (%)", fontsize=12)
plt.ylabel("Overall Marks (Composite)", fontsize=12)
plt.legend(title="Academic Risk", loc="upper left", frameon=True)
plt.tight_layout()
plt.savefig("images/eda_attendance_vs_marks.png", dpi=300)
plt.close()

# Chart 2: Correlation Heatmap
plt.figure(figsize=(12, 8))
corr_cols = [
    "Attendance (%)", "Midterm_Score", "Final_Score", "Assignments_Avg", 
    "Quizzes_Avg", "Participation_Score", "Projects_Score", "Total_Score",
    "math_score", "reading_score", "writing_score", "science_score", "Overall_Marks"
]
corr_matrix = df[corr_cols].corr()
sns.heatmap(corr_matrix, annot=True, fmt=".2f", cmap="coolwarm", cbar=True, square=False, linewidths=0.5)
plt.title("Correlation Matrix of Academic and Performance Metrics", fontsize=14, fontweight="bold", pad=12)
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
plt.savefig("images/eda_correlation_matrix.png", dpi=300)
plt.close()

# Chart 3: Department Risk Breakdown & Grade Breakdown
fig, axes = plt.subplots(1, 2, figsize=(15, 6))
order = ["Computer Science", "Engineering", "Business", "Mathematics"]
sns.countplot(
    data=df, 
    x="Department", 
    hue="Risk", 
    palette=palette, 
    order=order, 
    ax=axes[0]
)
axes[0].set_title("Risk Level Distribution Across Departments", fontsize=13, fontweight="bold")
axes[0].set_xlabel("Department", fontsize=11)
axes[0].set_ylabel("Student Count", fontsize=11)
axes[0].legend(title="Risk Level")

grade_order = ["A", "B", "C", "D", "F"]
sns.countplot(
    data=df, 
    x="Grade", 
    hue="Risk", 
    palette=palette, 
    order=grade_order, 
    ax=axes[1]
)
axes[1].set_title("Institutional Grade vs. Assigned Intervention Risk", fontsize=13, fontweight="bold")
axes[1].set_xlabel("Historical Grade", fontsize=11)
axes[1].set_ylabel("Student Count", fontsize=11)
axes[1].legend(title="Risk Level")

plt.tight_layout()
plt.savefig("images/eda_department_and_grade_risk.png", dpi=300)
plt.close()

# 4. Model Training & Comparison
feature_num = [
    "Attendance (%)", "Age", "Midterm_Score", "Final_Score", "Assignments_Avg", 
    "Quizzes_Avg", "Participation_Score", "Projects_Score", "Total_Score",
    "test_preparation_course", "math_score", "reading_score", "writing_score", "science_score"
]
feature_cat = ["Department", "Gender"]

X = df[feature_num + feature_cat]
y = df["Risk"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), feature_num),
        ("cat", OneHotEncoder(drop="first"), feature_cat)
    ]
)

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
    "Decision Tree": DecisionTreeClassifier(max_depth=6, random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, max_depth=4, random_state=42)
}

results = []
trained_pipelines = {}
y_preds = {}

risk_classes = ["HIGH", "MEDIUM", "LOW"]

for name, clf in models.items():
    pipe = Pipeline([
        ("preprocessor", preprocessor),
        ("classifier", clf)
    ])
    pipe.fit(X_train, y_train)
    trained_pipelines[name] = pipe
    
    y_pred = pipe.predict(X_test)
    y_preds[name] = y_pred
    
    acc = accuracy_score(y_test, y_pred)
    prec, rec, f1, _ = precision_recall_fscore_support(y_test, y_pred, average="weighted")
    prec_macro, rec_macro, f1_macro, _ = precision_recall_fscore_support(y_test, y_pred, average="macro")
    
    results.append({
        "Model": name,
        "Accuracy": acc,
        "Weighted Precision": prec,
        "Weighted Recall": rec,
        "Weighted F1": f1,
        "Macro F1": f1_macro
    })

res_df = pd.DataFrame(results)
print("\nEvaluation Comparison:")
print(res_df.to_string(index=False))

# Chart 4: Model Performance Comparison Bar Chart
plt.figure(figsize=(10, 6))
metrics_melted = res_df.melt(id_vars="Model", value_vars=["Accuracy", "Weighted Precision", "Weighted Recall", "Weighted F1"], var_name="Metric", value_name="Score")
sns.barplot(data=metrics_melted, x="Model", y="Score", hue="Metric", palette="Blues_d")
plt.ylim(0.70, 1.02)
plt.title("Comparative Performance Across ML Classifiers", fontsize=14, fontweight="bold", pad=12)
plt.xlabel("Algorithm", fontsize=12)
plt.ylabel("Score", fontsize=12)
plt.legend(loc="lower right")
plt.tight_layout()
plt.savefig("images/model_comparison_metrics.png", dpi=300)
plt.close()

# Chart 5: Confusion Matrices Grid
fig, axes = plt.subplots(2, 2, figsize=(13, 11))
axes = axes.flatten()

for i, (name, y_pred) in enumerate(y_preds.items()):
    cm = confusion_matrix(y_test, y_pred, labels=risk_classes)
    sns.heatmap(
        cm, annot=True, fmt="d", cmap="Blues", 
        xticklabels=risk_classes, yticklabels=risk_classes, 
        ax=axes[i], cbar=False
    )
    axes[i].set_title(f"{name}\nAcc: {res_df.loc[res_df['Model'] == name, 'Accuracy'].values[0]:.3f} | F1: {res_df.loc[res_df['Model'] == name, 'Weighted F1'].values[0]:.3f}", fontsize=12, fontweight="bold")
    axes[i].set_xlabel("Predicted Risk", fontsize=11)
    axes[i].set_ylabel("Actual Risk", fontsize=11)

plt.suptitle("Confusion Matrices for Risk Prediction Models", fontsize=15, fontweight="bold", y=1.00)
plt.tight_layout()
plt.savefig("images/confusion_matrices.png", dpi=300)
plt.close()

# Chart 6: Feature Importances from Best Ensemble Model (Gradient Boosting / Random Forest)
rf_model = trained_pipelines["Gradient Boosting"].named_steps["classifier"]
num_feature_names = feature_num
ohe = trained_pipelines["Gradient Boosting"].named_steps["preprocessor"].named_transformers_["cat"]
cat_feature_names = list(ohe.get_feature_names_out(feature_cat))
all_features = num_feature_names + cat_feature_names
importances = rf_model.feature_importances_

feat_imp_df = pd.DataFrame({
    "Feature": all_features,
    "Importance": importances
}).sort_values(by="Importance", ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(data=feat_imp_df.head(10), x="Importance", y="Feature", palette="viridis")
plt.title("Top 10 Feature Importances Driving Student Risk Classification", fontsize=14, fontweight="bold", pad=12)
plt.xlabel("Relative Importance Score", fontsize=12)
plt.ylabel("Feature", fontsize=12)
plt.tight_layout()
plt.savefig("images/feature_importance.png", dpi=300)
plt.close()

print("\nVisualizations successfully generated in 'images/' folder!")
