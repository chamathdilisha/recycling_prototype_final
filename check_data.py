# files saha folders samaga wada kirimata os module eka install karai
import os

# Methana "dataset" kiyala kiyanne, mage dataset eke folder name eka
dataset_path = "dataset"  

# dataset folder eka athule hama folder ekak harahama yaama
for category in os.listdir(dataset_path):

    # current folder ekata full path eka sadeema
    category_path = os.path.join(dataset_path, category)

    # current item eka folder ekakda kiyala check karanawa
    if os.path.isdir(category_path):

        # Category folder eka athule kochchara images pramanayak thiyenawada kiyala count karanawa
        num_images = len(os.listdir(category_path))

        # This displays the category name and the number of images it contains
        print(f"Category: '{category}' --> Found {num_images} images")



