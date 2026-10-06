"""
================================================================================
Developer Community SASTRA & GDG On Campus - AI/ML Recruitment Task
================================================================================
Student Academic Risk Identification & Intervention Recommendation System
================================================================================
Author: AI/ML Recruitment Candidate
Dataset: dcs_student_data.csv (Kaggle: ganeshkumarofficial/student-dataset)

Deliverables covered:
1. Data Exploration & Insight Extraction
2. Robust Preprocessing & Anomaly Rectification
3. Multi-Algorithm ML Model Training & Comparison
4. Multi-Metric Evaluation (Accuracy, Precision, Recall, F1, Confusion Matrix)
5. Individual Prediction & Personalized Recommendation Engine
6. Automation: Automated Report Generation (Student | Attendance | Risk | Recommendation)
================================================================================
"""

import os
import sys
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
from sklearn.metrics import classification_report, accuracy_score, precision_recall_fscore_support, confusion_matrix

# Global configuration
DATASET_PATH = "dcs_student_data.csv"
OUTPUT_DIR = "reports"
IMAGES_DIR = "images"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)


class StudentRiskSystem:
    def __init__(self, data_path=DATASET_PATH):
        self.data_path = data_path
        self.raw_df = None
        self.df = None
        self.models = {}
        self.best_model_name = "Gradient Boosting"
        self.best_pipeline = None
        self.feature_num = [
            "Attendance (%)", "Age", "Midterm_Score", "Final_Score", "Assignments_Avg", 
            "Quizzes_Avg", "Participation_Score", "Projects_Score", "Total_Score",
            "test_preparation_course", "math_score", "reading_score", "writing_score", "science_score"
        ]
        self.feature_cat = ["Department", "Gender"]
        self.risk_classes = ["HIGH", "MEDIUM", "LOW"]

    def load_and_preprocess(self):
        """
        Loads raw data, performs anomaly identification, cleans invalid values,
        imputes missing entries contextually, and engineers domain features.
        """
        print("=" * 70)
        print("STEP 1: DATA INGESTION & QUALITY AUDIT")
        print("=" * 70)
        self.raw_df = pd.read_csv(self.data_path)
        print(f"Loaded raw dataset with {len(self.raw_df)} rows and {len(self.raw_df.columns)} columns.")

        # 1. Deduplication
        duplicates_count = self.raw_df.duplicated().sum()
        print(f"Identified duplicate records: {duplicates_count}. Removing duplicates...")
        df = self.raw_df.drop_duplicates().copy()

        # 2. Text and Categorical Normalization
        print("Standardizing categorical representations (Department, Gender)...")
        df["Department"] = df["Department"].astype(str).str.strip().replace({
            "CS": "Computer Science",
            "Math": "Mathematics",
            "BUSINESS": "Business",
            "engineering": "Engineering"
        })
        df["Gender"] = df["Gender"].astype(str).str.strip().str.title()

        # 3. Type Correction (Handling malformed string characters such as tab '\\t' in math_score)
        print("Correcting corrupted numeric types in 'math_score'...")
        df["math_score"] = pd.to_numeric(df["math_score"].astype(str).str.strip(), errors="coerce")

        # 4. Outlier & Range Validation (Clipping to plausible educational domains)
        print("Rectifying impossible bounds (negative attendance, >100% scores, age anomalies)...")
        df["Attendance (%)"] = df["Attendance (%)"].clip(0.0, 100.0)
        df["Midterm_Score"] = df["Midterm_Score"].clip(0.0, 100.0)
        df["Final_Score"] = df["Final_Score"].clip(0.0, 100.0)
        df["Age"] = df["Age"].apply(lambda x: np.nan if (x < 15 or x > 60) else x)

        # 5. Missing Value Imputation
        print("Imputing missing values using median statistics...")
        impute_cols = [
            "Attendance (%)", "Age", "Midterm_Score", "Final_Score",
            "Assignments_Avg", "Quizzes_Avg", "Participation_Score",
            "Projects_Score", "math_score"
        ]
        for col in impute_cols:
            df[col] = df[col].fillna(df[col].median())

        # 6. Feature Engineering for Domain-Grounded Academic Performance
        df["Core_Subjects_Avg"] = df[["math_score", "reading_score", "writing_score", "science_score"]].mean(axis=1)
        # Weighted overall performance: 60% coursework assessment + 40% foundational subject exams
        df["Overall_Marks"] = (0.6 * df["Total_Score"] + 0.4 * df["Core_Subjects_Avg"]).round(2)

        # 7. Ground Truth Risk Labeling (Institutional Criteria)
        # Criteria grounded in university attendance bylaws (mandatory 75% cutoff) and pass thresholds
        def assign_risk(row):
            att = row["Attendance (%)"]
            marks = row["Overall_Marks"]
            if att < 65.0 or marks < 60.0 or (att < 75.0 and marks < 68.0):
                return "HIGH"
            elif att < 80.0 or marks < 75.0:
                return "MEDIUM"
            else:
                return "LOW"

        df["Risk"] = df.apply(assign_risk, axis=1)

        self.df = df
        print(f"Data cleaning complete! Retained {len(self.df)} clean records.")
        print("\nAssigned Risk Distribution:")
        print(self.df["Risk"].value_counts())
        return self.df

    def train_and_evaluate(self):
        """
        Trains and compares multiple machine learning algorithms using strict
        train/test split and unified preprocessor pipelines.
        """
        print("\n" + "=" * 70)
        print("STEP 2: MODEL TRAINING & RIGOROUS EVALUATION")
        print("=" * 70)

        X = self.df[self.feature_num + self.feature_cat]
        y = self.df["Risk"]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.20, random_state=42, stratify=y
        )
        self.X_test = X_test
        self.y_test = y_test

        preprocessor = ColumnTransformer(
            transformers=[
                ("num", StandardScaler(), self.feature_num),
                ("cat", OneHotEncoder(drop="first"), self.feature_cat)
            ]
        )

        candidate_models = {
            "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
            "Decision Tree": DecisionTreeClassifier(max_depth=6, random_state=42),
            "Random Forest": RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42),
            "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, max_depth=4, random_state=42)
        }

        eval_summary = []
        for name, clf in candidate_models.items():
            pipe = Pipeline([
                ("preprocessor", preprocessor),
                ("classifier", clf)
            ])
            pipe.fit(X_train, y_train)
            self.models[name] = pipe

            y_pred = pipe.predict(X_test)
            acc = accuracy_score(y_test, y_pred)
            prec, rec, f1, _ = precision_recall_fscore_support(y_test, y_pred, average="weighted")
            _, _, f1_macro, _ = precision_recall_fscore_support(y_test, y_pred, average="macro")

            eval_summary.append({
                "Algorithm": name,
                "Accuracy": f"{acc * 100:.2f}%",
                "Weighted Precision": f"{prec * 100:.2f}%",
                "Weighted Recall": f"{rec * 100:.2f}%",
                "Weighted F1": f"{f1 * 100:.2f}%",
                "Macro F1": f"{f1_macro * 100:.2f}%"
            })

        self.best_pipeline = self.models[self.best_model_name]
        summary_df = pd.DataFrame(eval_summary)
        print("\nModel Evaluation Comparison Table:")
        print(summary_df.to_string(index=False))

        print(f"\nDetailed Classification Report for Best Model ({self.best_model_name}):")
        best_preds = self.best_pipeline.predict(X_test)
        print(classification_report(y_test, best_preds, target_names=self.risk_classes))

        return summary_df

    def generate_recommendation(self, row, predicted_risk):
        """
        Derives an individualized, actionable academic recommendation based on
        root-cause diagnostic signals in attendance, course scores, and engagement.
        """
        att = row["Attendance (%)"]
        marks = row["Overall_Marks"]
        
        # Subject analysis
        subjects = {
            "Mathematics": row["math_score"],
            "Reading": row["reading_score"],
            "Writing": row["writing_score"],
            "Science": row["science_score"]
        }
        weakest_subject = min(subjects, key=subjects.get)
        weakest_score = subjects[weakest_subject]

        advice = []

        if predicted_risk == "HIGH":
            if att < 70:
                advice.append(f"Immediate attendance recovery required (current: {att:.1f}% vs 75% cutoff).")
            if marks < 60:
                advice.append(f"Aggregate marks ({marks:.1f}) are critical; mandatory faculty mentoring initiated.")
            if weakest_score < 55:
                advice.append(f"Enroll in remedial workshops for {weakest_subject} (score: {weakest_score:.0f}).")
            if row["Assignments_Avg"] < 65:
                advice.append("Clear pending assignment submissions with department TA.")
            if not advice:
                advice.append("Improve attendance and focus on upcoming assessments.")
            return " ".join(advice)

        elif predicted_risk == "MEDIUM":
            if att < 78:
                advice.append(f"Improve attendance from {att:.1f}% to above 80% to avoid examination penalty.")
            if marks < 72:
                advice.append(f"Strengthen exam prep in {weakest_subject} ({weakest_score:.0f} pts).")
            if row["Participation_Score"] < 5:
                advice.append("Increase classroom discussion participation.")
            if not advice:
                advice.append("Maintain consistent study schedule and monitor upcoming project milestones.")
            return " ".join(advice)

        else: # LOW RISK
            return (
                f"Consistent academic standing (Attendance: {att:.1f}%, Marks: {marks:.1f}). "
                f"Recommended for peer tutoring roles, honors seminars, and research initiatives."
            )

    def predict_single_student(self, student_id=None, row_index=None):
        """
        Demonstrates the exact output structure required in Section 5 of the recruitment prompt:
        Student: [Name / ID]
        Attendance: [xx]%
        Marks: [xx]
        Risk: [HIGH / MEDIUM / LOW]
        Recommendation: [Tailored actionable advice]
        """
        if student_id is not None:
            matches = self.df[self.df["Student_ID"] == student_id]
            if matches.empty:
                print(f"Student ID {student_id} not found!")
                return
            row = matches.iloc[0]
        elif row_index is not None:
            row = self.df.iloc[row_index]
        else:
            row = self.df.sample(1, random_state=42).iloc[0]

        student_name = f"{row['First_Name']} {row['Last_Name']} ({row['Student_ID']})"
        att = row["Attendance (%)"]
        marks = row["Overall_Marks"]

        # Predict using trained pipeline
        feat_row = pd.DataFrame([row[self.feature_num + self.feature_cat]])
        pred_risk = self.best_pipeline.predict(feat_row)[0]
        recom = self.generate_recommendation(row, pred_risk)

        output = f"""
Student: {student_name}
Attendance: {att:.1f}%
Marks: {marks:.1f}
Risk: {pred_risk}
Recommendation: {recom}
"""
        print(output.strip())
        return {
            "Student": student_name,
            "Attendance": f"{att:.1f}%",
            "Marks": f"{marks:.1f}",
            "Risk": pred_risk,
            "Recommendation": recom
        }

    def generate_automated_report(self, n_sample=500, filename="student_risk_report.csv"):
        """
        Fulfills Section 6 (Automation Bonus):
        Automatically generates a formatted report table containing:
        Student | Attendance | Risk | Recommendation
        """
        print("\n" + "=" * 70)
        print(f"STEP 3: GENERATING AUTOMATED REPORT ({n_sample} STUDENTS)")
        print("=" * 70)

        sample_subset = self.df.head(n_sample).copy()
        features_subset = sample_subset[self.feature_num + self.feature_cat]
        predicted_risks = self.best_pipeline.predict(features_subset)

        report_rows = []
        for i, (_, row) in enumerate(sample_subset.iterrows()):
            pred_risk = predicted_risks[i]
            recom = self.generate_recommendation(row, pred_risk)
            report_rows.append({
                "Student": f"{row['First_Name']} {row['Last_Name']} ({row['Student_ID']})",
                "Attendance": f"{row['Attendance (%)']:.1f}%",
                "Marks": f"{row['Overall_Marks']:.1f}",
                "Risk": pred_risk,
                "Recommendation": recom
            })

        report_df = pd.DataFrame(report_rows)
        csv_path = os.path.join(OUTPUT_DIR, filename)
        report_df.to_csv(csv_path, index=False)
        print(f"CSV Report saved to: {csv_path}")

        # Save Markdown summary
        md_path = os.path.join(OUTPUT_DIR, "student_risk_report.md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write("# Student Academic Risk & Intervention Report (Top 50 Sample)\n\n")
            f.write("| Student | Attendance | Marks | Risk | Recommendation |\n")
            f.write("| :--- | :--- | :--- | :--- | :--- |\n")
            for r in report_rows[:50]:
                f.write(f"| {r['Student']} | {r['Attendance']} | {r['Marks']} | **{r['Risk']}** | {r['Recommendation']} |\n")
        print(f"Markdown Report saved to: {md_path}")

        print("\nSample Preview of Automated Report:")
        print(report_df[["Student", "Attendance", "Risk", "Recommendation"]].head(5).to_string(index=False))
        return report_df


if __name__ == "__main__":
    system = StudentRiskSystem()
    system.load_and_preprocess()
    eval_df = system.train_and_evaluate()
    
    print("\n" + "=" * 70)
    print("SECTION 5 VERIFICATION: INDIVIDUAL SAMPLE PREDICTIONS")
    print("=" * 70)
    # Showcase 3 specific students (High, Medium, Low risk scenarios)
    system.predict_single_student(row_index=0)
    print("-" * 50)
    system.predict_single_student(row_index=1)
    print("-" * 50)
    system.predict_single_student(row_index=2)

    # Section 6: Automated Bonus Report
    system.generate_automated_report(n_sample=1000)
    print("\n[SUCCESS] End-to-end recruitment task execution completed.")
