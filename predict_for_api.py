import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
import warnings
warnings.filterwarnings("ignore")
import logging
logging.disable(logging.WARNING)

# command line ekath ekka communicate karanna awashya wena tools import karanawa
import sys
# ASP.NET walata kiyaweemata puluwan wena paridi, Python data JSON format ekata
# convert kirimata awashya wena tools import karagannawa
import json
# Program create kirimata saha file paths manage kirimata udaw wena
# 'Path' eka import karanawa
from pathlib import Path

# 'NumPy' kiyana library eka import karala, ekata 'np' kiyana short name eka denawa
import numpy as np
# 'TensorFlow' kiyana library eka import karala, ekata 'tf' kiyana short name eka denawa
import tensorflow as tf
tf.get_logger().setLevel(logging.ERROR)
try:
    import tf_keras as keras_module
    from tf_keras.preprocessing import image
except ImportError:
    keras_module = tf.keras
    from tensorflow.keras.preprocessing import image




# Model ekata predict karanna puluwan four waste categories tika store karagannawa
CLASS_NAMES = ["glass", "metal", "paper", "plastic"]
# Their order must be exactly the same as the order used when training the model
# Index 0 = glass
# Index 1 = metal
# Index 2 = paper
# Index 3 = plastic


# Python dictionary ekak hadanawa
# Me Python dictionary eke hama waste category ekakatama awashya recycling information thiyenawa
RECYCLING_INFORMATION = {
    "glass": {
        "material": "Glass",
        "instructions": [
            "Remove lids and caps.",
            "Rinse the glass item thoroughly.",
            "Place it in the glass recycling bin."
        ],
        "recyclingGuideline": "Do not include broken mirrors, ceramics, or light bulbs with normal glass recycling.",
        "binColor": "Green Bin / Glass Bin"
    },

    "metal": {
        "material": "Metal / Metal cans",
        "instructions": [
            "Empty the container completely.",
            "Rinse away food or liquid residue.",
            "Place it in the recyclable waste bin."
        ],
        "recyclingGuideline": "Aluminium and steel cans are normally recyclable. Do not crush them if local rules prohibit it.",
        "binColor": "Yellow Bin / Recyclables"
    },

    "paper": {
        "material": "Paper / Cardboard",
        "instructions": [
            "Remove plastic wrapping or other non-paper materials.",
            "Keep the paper clean and dry.",
            "Flatten cardboard before recycling."
        ],
        "recyclingGuideline": "Greasy, wet, or heavily contaminated paper may not be recyclable.",
        "binColor": "Blue Bin / Paper"
    },

    "plastic": {
        "material": "Plastic",
        "instructions": [
            "Empty the plastic container.",
            "Rinse away food or liquid residue.",
            "Check the recycling symbol before disposal."
        ],
        "recyclingGuideline": "Plastic marked with recycling symbols 1 or 2 is commonly accepted, but local rules may differ.",
        "binColor": "Yellow Bin / Recyclables"
    }
}

# predict_image kiyala function ekak hadanawa
# e wagema image_path parameter eka through image eke location eka
# receive karagannawa 
def predict_image(image_path):
    # Locate the model from the project folder
    project_folder = Path(__file__).resolve().parent
    # trained model ekata sumpurna path eka hadanawa
    model_path = project_folder / "waste_classification.keras"

    # Load the trained model without loading its old training configuration
    model = keras_module.models.load_model(model_path, compile=False)

    # Received image eka load karagena, eka resize karanna 224 x 224 pixels walata
    # 224 x 224 pixels thamai model eka expect karana size eka
    img = image.load_img(image_path, target_size=(224, 224))
    # Image eka convert karanawa array of numbers walata, mokada AI model ekakata
    # ordinary image file therum ganna ba
    img_array = image.img_to_array(img)
    # extra dimension ekak add karanawa image array ekata
    # eka image ekak witharak provide karata, model eka images expect karanne batches widihata
    img_array = np.expand_dims(img_array, axis=0)

    # Prepared image eka AI model ekata send karala
    # prediction score eka receive karagannawa
    predictions = model.predict(img_array, verbose=0)
    # batch eke thiyena palaweni image ekata prediction score eka gannawa
    scores = predictions[0]
    # Glass: 0.05
    # Metal: 0.10
    # Paper: 0.80
    # Plastic: 0.05

    # Highest prediction score eka thiyena category eka hoyagannawa
    predicted_category = CLASS_NAMES[int(np.argmax(scores))]
    # Highest prediction score eka aragena, eka model's confidence eka hatiyata store karagannawa
    confidence = float(np.max(scores))

    # Predicted category ekata aithi recycling information gannawa
    recycling_info = RECYCLING_INFORMATION[predicted_category]
    # Check karanawa confidence eka 70% walata wada aduida kiyala
    low_confidence = confidence < 0.70
    # If confidence is 0.65, low_confidence becomes True
    # If confidence is 0.90, low_confidence becomes False

    # prediction saha recycling information thiyena dictionary eka return karanawa
    return {
        "status": "low_confidence" if low_confidence else "success",
        "category": predicted_category,
        "confidence": round(confidence, 4),
        "confidencePercentage": round(confidence * 100, 2),
        "lowConfidence": low_confidence,
        "material": recycling_info["material"],
        "instructions": recycling_info["instructions"],
        "recyclingGuideline": recycling_info["recyclingGuideline"],
        "binColor": recycling_info["binColor"]
    }

# Python program eka start unama, e hama deyakma control karanne menna me
# main function eka
def main():
    # The ASP.NET backend must provide one image path
    if len(sys.argv) != 2:
        # hadissiyewath image path ekak deela naththam, error message eka
        # JSON walata convert karala print karanawa
        print(json.dumps({
            "error": "An image path was not provided."
        }))
        sys.exit(1) # Program eka nawaththanawa
        # 1 kiyana eka indicate karanne, program eka end une error ekak nisa kiyala

    # meken protected section ekak start karanawa
    # Python will attempt to run this code and handle any errors safely
    try:
        # ASP.NET eken provide karapu image path eka aragena
        # eka yawanawa predict_image() function ekata
        result = predict_image(sys.argv[1])

        # Prediction results JSON walata convert karala print karanawa
        print(json.dumps(result))

    # try section ekedi error ekak awoth meka run karanawa
    except Exception as error:
        # error eka text walata convert karanawa, itapasse eka JSON eka athula thiyala
        # print karanawa, ethakota ASP.NET ekata kiyawanna puluwan wenawa
        print(json.dumps({
            "error": str(error)
        }))
        sys.exit(1) # Stops the program and indicates that it failed

# Me Python file eka directly start karalada kiyala check karanawa
if __name__ == "__main__":
    main()  # main() function eka call karala, program eka patan gannawa