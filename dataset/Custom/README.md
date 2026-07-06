Custom dataset directory placeholder.
# Custom Data

This directory contains user-defined datasets, custom OCR resources, and project-specific files used to extend the functionality of the Handwritten Digital Recognition System.

Unlike the `samples/` directory, the contents of this folder are not included as part of the default application and are intended for customization and experimentation.

---

## Purpose

The `custom/` directory allows developers and users to:

- Store custom OCR datasets
- Train or fine-tune OCR models
- Save custom preprocessing configurations
- Store custom dictionaries
- Add language-specific resources
- Test new OCR algorithms
- Benchmark custom models

---

## Directory Structure

```text
custom/
│
├── datasets/
│   ├── handwriting/
│   ├── printed/
│   └── multilingual/
│
├── dictionaries/
│   ├── english.txt
│   ├── hindi.txt
│   └── technical_terms.txt
│
├── models/
│   ├── trocr/
│   ├── easyocr/
│   └── custom_model/
│
├── preprocessing/
│   ├── configs/
│   └── templates/
│
├── experiments/
│   ├── experiment_01/
│   └── experiment_02/
│
└── README.md
```

---

## Datasets

Store datasets used for:

- OCR model training
- Fine-tuning
- Validation
- Benchmark testing

Example

```text
datasets/

├── handwriting/
├── printed/
├── forms/
└── receipts/
```

---

## Dictionaries

Contains custom word lists for:

- Spell correction
- Domain-specific vocabulary
- Medical terminology
- Technical terms
- Legal documents
- Educational content

Example

```text
technical_terms.txt

algorithm
database
neural
transformer
tokenization
```

---

## Models

Store downloaded or fine-tuned OCR models.

Examples

```text
models/

├── trocr/
├── paddle/
├── easyocr/
└── custom_transformer/
```

---

## Preprocessing

Contains custom preprocessing templates or configuration files.

Examples

- Threshold settings
- CLAHE parameters
- Image enhancement profiles
- OCR presets

---

## Experiments

Use this folder for research and development.

Examples

```text
experiment_01/

├── input/
├── output/
├── metrics.json
└── notes.md
```

---

## Example Workflow

```text
Custom Dataset
        │
        ▼
Preprocessing
        │
        ▼
OCR Model
        │
        ▼
Evaluation
        │
        ▼
Metrics
        │
        ▼
Export Results
```

---

## Recommended Naming

Datasets

```text
dataset_v1/

dataset_v2/

english_handwriting/

forms_dataset/
```

Models

```text
trocr_v1/

trocr_finetuned/

easyocr_custom/
```

Experiments

```text
experiment_001/

experiment_002/

benchmark_v1/
```

---

## Version Control

Small configuration files may be committed.

Large datasets and trained models should generally be excluded.

Example `.gitignore`

```gitignore
custom/models/*
custom/datasets/*
custom/experiments/*
!custom/README.md
```

---

## Notes

- Intended for developer customization.
- Supports experimentation and model development.
- May contain trained models and datasets.
- Large files should be stored using external storage solutions if necessary.
- Safe to organize according to project requirements.