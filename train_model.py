
import tensorflow as tf

from tensorflow.keras import layers,models


from tensorflow.keras.applications import MobileNetV2


DATASET_PATH = "dataset"
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32  



print("Loading the dataset...")



train_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,    
    subset = "training",   
    seed = 123,    
    image_size = IMAGE_SIZE,
    batch_size = BATCH_SIZE
)


val_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split = 0.2,
    subset = "validation",
    seed = 123,
    image_size = IMAGE_SIZE,
    batch_size = BATCH_SIZE
)


class_names = train_dataset.class_names


print("Detected classes: " + str(class_names))



base_model = MobileNetV2(
    input_shape = (224, 224, 3), 
    include_top = False, 
    weights = "imagenet" 
)


base_model.trainable = False


model = models.Sequential([

    
    layers.Rescaling(1./255, input_shape = (224, 224, 3)),

    
    base_model,

    
    layers.GlobalAveragePooling2D(),

    
    layers.Dense(64, activation="relu"),


    layers.Dropout(0.2),

    
    layers.Dense(len(class_names), activation="softmax")


])


model.compile(
    optimizer='adam',  
    loss ='sparse_categorical_crossentropy', 
    metrics = ['accuracy'] 
)


print("Training started...This may take a few minutes!")

history = model.fit(
    train_dataset,
    validation_data = val_dataset, 
    epochs = 9  
)


model.save("waste_classification.keras")  

print("Model training completed and saved as 'waste_classification.keras'!")