import os

dataset_path = "dataset"  

for category in os.listdir(dataset_path):

    category_path = os.path.join(dataset_path, category)

    if os.path.isdir(category_path):

        num_images = len(os.listdir(category_path))

        print(f"Category: '{category}' --> Found {num_images} images")



