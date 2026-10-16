import numpy as np
import tensorflow as tf 
from tensorflow.keras.preprocessing import image


print("Loading the trained model...")
model = tf.keras.models.load_model("waste_classification.keras")


class_names = ['glass', 'metal', 'paper', 'plastic'] 


RECYCLING_TIPS = {
    "glass":{
        "material": "Glass",
        "instruction": "Remove lids and caps. Rinse thoroughly before recycling.",
        "bin_color": "Green Bin / Glass Bin"
    },

    "metal": {
        "material": "Metal / Metal cans",
        "instruction": "Empty and rinse aluminum or steel cans. Do not crush if required locally.",
        "bin_color": "Yellow Bin / Recyclables"
    },

    "paper": {
        "material": "Paper / Cardboard",
        "instruction": "Keep dry and flat. Remove any greasy food stains or plastic wrapping.",
        "bin_color": "Blue Bin / Paper"
    },

    "plastic": {
        "material": "Plastic",
        "instruction": "Rinse out food or liquid residue. Check for recycling symbols #1 or #2.",
        "bin_color": "Yellow Bin / Recyclables"
    }

}


def predict_image(image_path):

    print(f"Analyzing the image: '{image_path}'...")

    
    img = image.load_img(image_path, target_size=(224, 224))

   
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

   
    predictions = model.predict(img_array, verbose=0)
    score = predictions[0]

    
    predicted_class = class_names[np.argmax(score)]
    confidence = round(100 * np.max(score), 2)

    
    guidelines = RECYCLING_TIPS[predicted_class]

    print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

    if confidence < 70.0:
        print("Status: LOW CONFIDENCE! Please verify the item manually.")
        print(f"Confidence score: {confidence}%")

    else: 
        guidelines = RECYCLING_TIPS.get(predicted_class, None)

        print(f"Predicted category: {predicted_class.upper()}")
        print(f"Confidence score: {confidence}%")
        
        if guidelines:
            print("Recycling Guidelines:")
            print(f"  Material: {guidelines['material']}")
            print(f"  Instruction: {guidelines['instruction']}")
            print(f"  Bin Color: {guidelines['bin_color']}")
    
    print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

predict_image("my_test_item.jpeg")