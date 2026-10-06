# EduPulse AI: Intelligent Student Academic Risk Assessment & Intervention System

**An End-to-End Machine Learning Diagnostic Pipeline for Early Warning, Predictive Risk Classification, and Automated Remedial Recommendations**

**Dataset:** [Student Performance Dataset](https://www.kaggle.com/datasets/ganeshkumarofficial/student-dataset) (`dcs_student_data.csv`)  
**Core Technologies:** Python, Scikit-Learn, Pandas, NumPy, Seaborn, Matplotlib

---

## 📌 Executive Summary

Higher educational institutions require reliable, early-warning diagnostic systems to identify students at academic risk well before end-semester examinations. Early detection enables academic advisors, faculty mentors, and counselors to allocate targeted tutoring, schedule personalized mentoring sessions, and remediate attendance deficits before students face exam debarment or academic probation.

**EduPulse AI** delivers a production-grade Machine Learning solution and automated reporting pipeline designed to:
1. **Audit & Preprocess Academic Telemetry:** Clean and handle missing values, out-of-bounds metrics, corrupted entries, and exact duplicates.
2. **Formulate Institutional Risk Tiers:** Ground risk classifications in real-world university attendance bylaws and academic passing thresholds.
3. **Train & Compare Predictive Models:** Benchmark **Logistic Regression**, **Decision Tree**, **Random Forest**, and **Gradient Boosting** classifiers with rigorous stratified validation.
4. **Deliver Diagnostic Recommendations:** Generate personalized, student-specific intervention plans addressing root causes (attendance deficit, continuous assessment gaps, or subject-level struggles).
5. **Automate Institutional Reporting:** Produce instant batch reports (`Student | Attendance | Marks | Risk | Recommendation`) for institutional leadership and department heads.

---

## 📁 Repository Structure

```text
├── dcs_student_data.csv            # Cleaned source dataset (10,030 student records)
├── solution.py                     # Self-contained end-to-end Python pipeline
├── student_risk_analysis.ipynb     # Interactive Jupyter Notebook with analysis & plots
├── generate_visualizations.py      # Script to render publication-ready figures
├── create_notebook.py              # Automated Jupyter notebook builder script
├── requirements.txt                # Frozen Python dependencies
├── images/                         # Generated visualizations and metric plots
│   ├── eda_attendance_vs_marks.png
│   ├── eda_correlation_matrix.png
│   ├── eda_department_and_grade_risk.png
│   ├── model_comparison_metrics.png
│   ├── confusion_matrices.png
│   └── feature_importance.png
├── reports/                        # Automated reporting deliverables
│   ├── student_risk_report.csv     # Full batch report (Student | Attendance | Risk | Recommendation)
│   └── student_risk_report.md      # Formatted Markdown report preview
└── README.md                       # Comprehensive project documentation
```

---

## 🔍 Section 1: Exploratory Data Analysis & Data Quality Audit

During exploratory analysis, an in-depth audit of the raw dataset (`10,030` rows, `21` columns) revealed several **data quality anomalies and corruptions** that were systematically identified and handled:

1. **Exact Duplicate Records:** 30 duplicate records were detected and purged.
2. **Malformed String Types:** The `math_score` column was parsed as `object` (string) due to entries containing whitespace and escape sequences (e.g. `\t41`).
3. **Out-of-Bounds Attendance:** Percentages contained negative numbers (`-12.0%`) and values exceeding 100% (`135.0%`).
4. **Out-of-Bounds Examination Scores:** `Midterm_Score` and `Final_Score` contained negative values (`-8.0`, `-5.0`) and scores exceeding the 100-point ceiling (`145.0`, `132.0`).
5. **Biologically Implausible Ages:** `Age` contained negative numbers (`-3.0`) and outlier values (`87.0`).
6. **Inconsistent Categorical Text:**
   - `Department`: Multiple representations for identical departments (`"CS"` vs `"Computer Science"`, `"Math"` vs `"Mathematics"`, `"BUSINESS"` vs `"Business"`, and leading whitespaces like `" engineering"`).
   - `Gender`: Trailing and leading whitespaces (`" MALE "`, `" FEMALE "`).
7. **Missing Values:** Approximately 2% null values were present across numeric performance columns.

### Key Finding: Attendance vs. Academic Performance
Analysis demonstrates that attendance is the primary leading indicator of academic performance. Students with attendance below the mandatory 75% threshold exhibit a high probability of failing or borderline grades, making early attendance tracking essential.

---

## ⚙️ Section 2: Data Preprocessing Pipeline

To guarantee data integrity and prevent data leakage:
1. **Deduplication:** Dropped exact duplicate rows, retaining 10,000 unique student profiles.
2. **Categorical Standardization:** Stripped whitespace and unified department names (`CS` $\rightarrow$ `Computer Science`, `Math` $\rightarrow$ `Mathematics`, etc.) and title-cased gender.
3. **Type Restoration:** Cleaned and cast `math_score` to numeric floats.
4. **Domain Boundary Clipping:** Constrained `Attendance (%)`, `Midterm_Score`, and `Final_Score` strictly to `[0.0, 100.0]`. Filtered anomalous ages outside `[15, 60]`.
5. **Contextual Median Imputation:** Imputed missing values using feature medians.
6. **Feature Engineering:**
   - `Core_Subjects_Avg`: Unweighted mean across foundational subjects (`math_score`, `reading_score`, `writing_score`, `science_score`).
   - `Overall_Marks`: Weighted composite score combining continuous coursework assessment (`Total_Score`, 60%) and foundational subject exams (40%).

---

## 🎯 Section 3: Academic Risk Criteria Definition

In institutional higher education and technical universities, risk classification reflects regulatory cutoff rules and academic grading policies:

### 1. Regulatory Attendance Threshold (Mandatory 75% Cutoff)
- **Attendance < 65%:** Severe risk of detention / exam debarment.
- **Attendance 65% – 79.9%:** Cautionary zone requiring formal advisories.
- **Attendance $\ge$ 80%:** Compliant academic standing.

### 2. Academic Score Threshold (Passing & Good Standing)
- **Marks < 60:** High risk of failing coursework or graduating with sub-par CGPA (< 6.0).
- **Marks 60 – 74.9:** Borderline / average performance requiring monitoring.
- **Marks $\ge$ 75:** Good to excellent academic health.

### Formal Multi-Tier Classification Matrix

| Risk Tier | Operational Criteria | Institutional Action |
| :--- | :--- | :--- |
| **HIGH RISK** | `Attendance < 65%` **OR** `Overall_Marks < 60` **OR** (`Attendance < 75%` **AND** `Overall_Marks < 68`) | Immediate intervention: Faculty mentoring, attendance recovery plan, and remedial workshops. |
| **MEDIUM RISK** | `Attendance < 80%` **OR** `Overall_Marks < 75` (and not High Risk) | Cautionary advisory, peer tutoring, and close monitoring prior to midterms. |
| **LOW RISK** | `Attendance >= 80%` **AND** `Overall_Marks >= 75` | Academic commendation; eligible for honors electives, research projects, and teaching assistantships. |

**Resulting Population Distribution:**
- **High Risk:** 42.62%
- **Medium Risk:** 42.61%
- **Low Risk:** 14.77%

---

## 🤖 Section 4: Machine Learning Model Comparison & Evaluation

To evaluate model generalization, an **80/20 Stratified Split** was implemented. All candidate models were trained strictly on **raw student features** (`Attendance (%)`, `Age`, `Midterm_Score`, `Final_Score`, `Assignments_Avg`, `Quizzes_Avg`, `Participation_Score`, `Projects_Score`, `Total_Score`, `test_preparation_course`, `math_score`, `reading_score`, `writing_score`, `science_score`, `Department`, `Gender`).

### Comparative Performance Table

| Algorithm | Accuracy | Weighted Precision | Weighted Recall | Weighted F1 | Macro F1 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 81.90% | 82.13% | 81.90% | 81.94% | 81.10% |
| **Decision Tree (depth=6)** | 90.00% | 90.32% | 90.00% | 90.07% | 89.30% |
| **Random Forest (n=100)** | 93.45% | 93.96% | 93.45% | 93.45% | 92.53% |
| **Gradient Boosting (Best)** | **96.30%** | **96.34%** | **96.30%** | **96.31%** | **96.04%** |

### Evaluation Takeaways:
- **Logistic Regression** serves as a fast baseline, capturing linear separation with ~81.9% accuracy.
- **Tree Ensembles** significantly outperform linear boundaries due to non-linear combinations of attendance and subject thresholds.
- **Gradient Boosting** achieved top performance with **96.30% Accuracy** and **96.31% F1-score**. Crucially, it achieved **0.98 Precision** and **0.96 Recall** on the **HIGH RISK** class, minimizing costly false negatives (students failing without timely warning).

---

## 💡 Section 5: Prediction & Tailored Recommendation System

The recommendation engine performs diagnostic root-cause analysis on each student's profile:
1. Calculates attendance shortfall against the 75% university benchmark.
2. Identifies specific course/subject weaknesses (e.g. Mathematics vs Science).
3. Evaluates continuous assessment submission rates (assignments, quizzes, participation).

### Sample Output Format:

```text
Student: Omar Williams (S1000)
Attendance: 52.3%
Marks: 57.5
Risk: HIGH
Recommendation: Immediate attendance recovery required (current: 52.3% vs 75% cutoff). Aggregate marks (57.5) are critical; mandatory faculty mentoring initiated. Enroll in remedial workshops for Science (score: 26).
```

```text
Student: Maria Brown (S1001)
Attendance: 97.3%
Marks: 63.2
Risk: MEDIUM
Recommendation: Strengthen exam prep in Mathematics (65 pts).
```

```text
Student: John Doe (S2045)
Attendance: 88.5%
Marks: 82.1
Risk: LOW
Recommendation: Consistent academic standing (Attendance: 88.5%, Marks: 82.1). Recommended for peer tutoring roles, honors seminars, and research initiatives.
```

---

## ⚡ Section 6: Automated Institutional Reporting

The system includes automated batch report generation, saving the results in both CSV and Markdown formats:
- CSV: `reports/student_risk_report.csv`
- Markdown: `reports/student_risk_report.md`

### Preview of Generated Report

| Student | Attendance | Marks | Risk | Recommendation |
| :--- | :---: | :---: | :---: | :--- |
| **Omar Williams (S1000)** | 52.3% | 57.5 | **HIGH** | Immediate attendance recovery required (current: 52.3% vs 75% cutoff). Aggregate marks (57.5) are critical; mandatory faculty mentoring initiated. Enroll in remedial workshops for Science (score: 26). |
| **Maria Brown (S1001)** | 97.3% | 63.2 | **MEDIUM** | Strengthen exam prep in Mathematics (65 pts). |
| **Ahmed Jones (S1002)** | 57.2% | 68.6 | **HIGH** | Immediate attendance recovery required (current: 57.2% vs 75% cutoff). Enroll in remedial workshops for Mathematics (score: 10). |
| **Omar Williams (S1003)** | 95.2% | 56.8 | **HIGH** | Aggregate marks (56.8) are critical; mandatory faculty mentoring initiated. Enroll in remedial workshops for Mathematics (score: 22). |
| **John Smith (S1004)** | 54.2% | 57.0 | **HIGH** | Immediate attendance recovery required (current: 54.2% vs 75% cutoff). Enroll in remedial workshops for Mathematics (score: 26). |

---

## 🚀 How to Run

### Option 1: Run the End-to-End Python Script
```powershell
# Activate environment and run pipeline
.\.venv\Scripts\python solution.py
```
This executes the full data cleaning, trains all 4 models, prints comparative metrics, validates individual sample predictions, and generates the reports in `reports/`.

### Option 2: Generate All Charts
```powershell
.\.venv\Scripts\python generate_visualizations.py
```
Generates all 6 analytical and evaluation figures in the `images/` directory.

### Option 3: Run Interactive Jupyter Notebook
Open `student_risk_analysis.ipynb` in VS Code, JupyterLab, or Google Colab and run all cells to step through the story, markdown narrative, and interactive graphs.
