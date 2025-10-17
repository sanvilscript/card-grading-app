# AI Card Grading - Development Guide

Complete guide for creating or training an AI system for card grading.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Option 1: Using Existing APIs](#option-1-using-existing-apis)
3. [Option 2: Training Custom Model](#option-2-training-custom-model)
4. [Option 3: Fine-tuning Pre-trained Models](#option-3-fine-tuning-pre-trained-models)
5. [Technical Resources](#technical-resources)
6. [Implementation Steps](#implementation-steps)

---

## 🎯 Overview

### What You Need for AI Card Grading

An AI card grading system requires:
- **Object Detection**: Locate card in image
- **Corner Detection**: Identify 4 corners precisely
- **Edge Detection**: Analyze 4 edges
- **Surface Analysis**: Detect scratches, dents, wear
- **Centering Calculation**: Measure border ratios
- **Grading Algorithm**: Convert measurements to grades

### Approaches Comparison

| Approach | Cost | Time | Accuracy | Maintenance |
|----------|------|------|----------|-------------|
| Existing API | Low | Immediate | High | None |
| Custom Model | High | 6-12 months | Variable | High |
| Fine-tuning | Medium | 2-4 months | Good | Medium |

---

## 🔌 Option 1: Using Existing APIs

### Ximilar Card Grading API (Current)

**Endpoints:**
```
https://api.ximilar.com/card-grader/v2/grade
https://api.ximilar.com/card-grader/v2/centering
https://api.ximilar.com/card-grader/v2/condition
https://api.ximilar.com/card-grader/v2/localize
```

**Pricing:**
- Pay-per-use model
- ~$0.05-0.10 per image
- Volume discounts available

**Pros:**
- ✅ Ready to use immediately
- ✅ High accuracy (trained on millions of cards)
- ✅ No maintenance required
- ✅ Regular updates and improvements
- ✅ Multiple endpoints for different needs

**Cons:**
- ❌ Recurring costs
- ❌ Dependency on external service
- ❌ Limited customization

**Documentation:**
- https://docs.ximilar.com/collectibles/card-grading

### Alternative APIs

1. **Google Cloud Vision AI**
   - General object detection
   - Would need custom logic for grading
   - https://cloud.google.com/vision

2. **AWS Rekognition**
   - Image analysis capabilities
   - Custom labels possible
   - https://aws.amazon.com/rekognition/

3. **Azure Computer Vision**
   - Object detection
   - Custom model training available
   - https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/

---

## 🤖 Option 2: Training Custom Model

### Required Components

#### 1. Dataset Collection
**Minimum Requirements:**
- 50,000+ card images (front and back)
- Multiple conditions (Mint to Poor)
- Various card types (TCG, Sports)
- Diverse lighting conditions
- Different backgrounds

**Annotations Needed:**
- Bounding boxes for cards
- Corner coordinates (4 points)
- Edge coordinates (4 lines)
- Surface defect locations
- Grade labels (1-10 scale)

#### 2. Model Architecture

**Recommended Approach: Multi-task Learning**

```
Input Image
    ↓
Backbone (Feature Extraction)
    ↓
    ├─→ Object Detection Head → Card Location
    ├─→ Keypoint Detection Head → Corners/Edges
    ├─→ Classification Head → Surface Quality
    └─→ Regression Head → Centering Metrics
```

**Backbone Options:**

1. **EfficientNet-B4/B7**
   - Best accuracy/speed tradeoff
   - Pre-trained on ImageNet
   - Good for mobile deployment

2. **ResNet-50/101**
   - Proven architecture
   - Widely supported
   - Easy to fine-tune

3. **Vision Transformer (ViT)**
   - State-of-the-art accuracy
   - Requires more data
   - Higher computational cost

#### 3. Detection Models

**For Card Localization:**

1. **YOLOv8**
   ```python
   from ultralytics import YOLO
   
   # Train custom card detector
   model = YOLO('yolov8n.pt')
   model.train(data='cards.yaml', epochs=100)
   ```
   - Fast inference (~30ms)
   - Good accuracy
   - Easy to deploy

2. **Faster R-CNN**
   - Higher accuracy
   - Slower inference (~100ms)
   - Better for complex scenes

**For Corner/Edge Detection:**

1. **HRNet (High-Resolution Net)**
   - Excellent for keypoint detection
   - Maintains spatial resolution
   - Used in pose estimation

2. **CornerNet**
   - Specifically designed for corner detection
   - No anchor boxes needed
   - Good for precise localization

#### 4. Training Pipeline

```python
# Pseudo-code for training pipeline

import torch
import torchvision
from torch.utils.data import DataLoader

# 1. Data Preparation
dataset = CardGradingDataset(
    images_dir='data/images',
    annotations='data/annotations.json',
    transform=augmentation_pipeline
)

train_loader = DataLoader(dataset, batch_size=32, shuffle=True)

# 2. Model Definition
model = MultiTaskCardGrader(
    backbone='efficientnet-b4',
    num_classes=10,  # grades 1-10
    num_keypoints=4  # 4 corners
)

# 3. Loss Functions
detection_loss = FocalLoss()
keypoint_loss = MSELoss()
classification_loss = CrossEntropyLoss()
regression_loss = SmoothL1Loss()

# 4. Training Loop
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)

for epoch in range(100):
    for batch in train_loader:
        images, targets = batch
        
        # Forward pass
        outputs = model(images)
        
        # Calculate losses
        loss = (
            detection_loss(outputs['boxes'], targets['boxes']) +
            keypoint_loss(outputs['keypoints'], targets['keypoints']) +
            classification_loss(outputs['grades'], targets['grades']) +
            regression_loss(outputs['centering'], targets['centering'])
        )
        
        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

#### 5. Data Augmentation

```python
import albumentations as A

augmentation = A.Compose([
    A.RandomRotate90(p=0.5),
    A.Flip(p=0.5),
    A.RandomBrightnessContrast(p=0.3),
    A.GaussNoise(p=0.2),
    A.MotionBlur(p=0.2),
    A.OpticalDistortion(p=0.2),
    A.GridDistortion(p=0.2),
    A.HueSaturationValue(p=0.3),
], bbox_params=A.BboxParams(format='coco'))
```

### Estimated Costs

- **GPU Training**: $500-2000/month (AWS/GCP)
- **Data Annotation**: $10,000-50,000 (depending on dataset size)
- **Development Time**: 6-12 months
- **Team**: 2-3 ML engineers

### Tools & Frameworks

- **PyTorch** or **TensorFlow** for model development
- **Detectron2** for object detection
- **MMDetection** for advanced detection models
- **Weights & Biases** for experiment tracking
- **Label Studio** for data annotation

---

## 🎓 Option 3: Fine-tuning Pre-trained Models

### Available Pre-trained Models

#### 1. COCO Pre-trained Models
- Models trained on COCO dataset
- Good for general object detection
- Need fine-tuning for cards

**Example with YOLOv8:**
```python
from ultralytics import YOLO

# Load pre-trained model
model = YOLO('yolov8n.pt')

# Fine-tune on card dataset
model.train(
    data='cards.yaml',
    epochs=50,
    imgsz=640,
    batch=16,
    name='card_detector'
)
```

#### 2. OpenCV DNN Models
- Pre-trained detection models
- Can be fine-tuned with custom data
- Good for edge deployment

#### 3. Hugging Face Models
- Vision Transformers (ViT)
- DETR (Detection Transformer)
- Swin Transformer

**Example:**
```python
from transformers import DetrForObjectDetection, DetrImageProcessor

processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50")
model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50")

# Fine-tune on card dataset
# ... training code
```

### Dataset Requirements for Fine-tuning

**Minimum:**
- 5,000-10,000 annotated images
- Diverse conditions and card types
- Proper train/val/test split (70/15/15)

**Annotation Format:**
```json
{
  "images": [
    {
      "id": 1,
      "file_name": "card_001.jpg",
      "width": 1920,
      "height": 1080
    }
  ],
  "annotations": [
    {
      "id": 1,
      "image_id": 1,
      "category_id": 1,
      "bbox": [100, 150, 800, 1000],
      "corners": [[120, 170], [880, 160], [890, 1130], [110, 1140]],
      "grade": 8.5,
      "condition": "Near Mint"
    }
  ]
}
```

---

## 📚 Technical Resources

### Research Papers

1. **Object Detection:**
   - "You Only Look Once: Unified, Real-Time Object Detection" (YOLO)
   - "Faster R-CNN: Towards Real-Time Object Detection"
   - "EfficientDet: Scalable and Efficient Object Detection"

2. **Keypoint Detection:**
   - "Deep High-Resolution Representation Learning for Human Pose Estimation"
   - "CornerNet: Detecting Objects as Paired Keypoints"

3. **Quality Assessment:**
   - "No-Reference Image Quality Assessment in the Spatial Domain"
   - "Deep Learning for Image Quality Assessment"

### Datasets

1. **Trading Card Datasets:**
   - Pokemon Card Dataset (Kaggle)
   - Sports Card Dataset (Roboflow)
   - Custom scraped datasets from eBay/TCGPlayer

2. **General Object Detection:**
   - COCO Dataset
   - Open Images Dataset
   - ImageNet

### Tools & Libraries

```bash
# Core ML Frameworks
pip install torch torchvision
pip install tensorflow

# Computer Vision
pip install opencv-python
pip install albumentations
pip install imgaug

# Object Detection
pip install ultralytics  # YOLOv8
pip install detectron2
pip install mmdet

# Annotation Tools
pip install label-studio
pip install labelImg

# Experiment Tracking
pip install wandb
pip install tensorboard

# Deployment
pip install onnx
pip install onnxruntime
pip install tensorflow-lite
```

---

## 🚀 Implementation Steps

### Phase 1: Data Collection (2-4 weeks)

1. **Collect Images**
   - Scrape from online marketplaces
   - Partner with card grading companies
   - Use existing datasets
   - Take photos of personal collection

2. **Annotation**
   - Use Label Studio or CVAT
   - Annotate card boundaries
   - Mark corners and edges
   - Label grades and conditions

3. **Data Validation**
   - Check annotation quality
   - Remove duplicates
   - Balance dataset across grades

### Phase 2: Model Development (4-8 weeks)

1. **Baseline Model**
   - Start with pre-trained YOLOv8
   - Fine-tune on card detection
   - Evaluate on validation set

2. **Multi-task Model**
   - Add corner detection head
   - Add edge detection head
   - Add grading classification head

3. **Optimization**
   - Hyperparameter tuning
   - Data augmentation experiments
   - Model architecture search

### Phase 3: Training & Evaluation (4-8 weeks)

1. **Training**
   - Train on full dataset
   - Monitor metrics (mAP, accuracy, loss)
   - Use early stopping

2. **Evaluation**
   - Test on held-out set
   - Compare with human graders
   - Analyze failure cases

3. **Iteration**
   - Collect more data for weak areas
   - Retrain with improved data
   - Fine-tune hyperparameters

### Phase 4: Deployment (2-4 weeks)

1. **Model Optimization**
   - Convert to ONNX or TFLite
   - Quantization for speed
   - Test inference time

2. **API Development**
   - Create REST API (FastAPI/Flask)
   - Add authentication
   - Implement rate limiting

3. **Testing**
   - Load testing
   - Integration testing
   - User acceptance testing

---

## 💰 Cost Comparison

### API Approach (Ximilar)
- **Setup**: $0
- **Monthly**: $100-1000 (depending on volume)
- **Time to Market**: Immediate
- **Total Year 1**: $1,200-12,000

### Custom Model
- **Development**: $50,000-150,000
- **Infrastructure**: $6,000-24,000/year
- **Maintenance**: $20,000-50,000/year
- **Total Year 1**: $76,000-224,000

### Fine-tuning
- **Development**: $10,000-30,000
- **Infrastructure**: $3,000-12,000/year
- **Maintenance**: $10,000-20,000/year
- **Total Year 1**: $23,000-62,000

---

## 🎯 Recommendation

**For Most Use Cases: Use Ximilar API**
- Fastest time to market
- Lowest cost initially
- High accuracy
- No maintenance burden

**Consider Custom Model If:**
- Processing >100,000 images/month
- Need specific customizations
- Have ML team in-house
- Long-term strategic investment

**Consider Fine-tuning If:**
- Need some customization
- Medium volume (10,000-100,000/month)
- Have ML expertise
- Want to own the model

---

## 📞 Next Steps

1. **Evaluate Requirements**
   - Expected volume
   - Budget constraints
   - Timeline requirements
   - Customization needs

2. **Proof of Concept**
   - Test Ximilar API with sample images
   - Measure accuracy for your use case
   - Calculate costs at expected volume

3. **Decision**
   - Choose approach based on evaluation
   - Plan implementation timeline
   - Allocate resources

---

**Last Updated**: January 2025  
**Status**: Active Development Guide
