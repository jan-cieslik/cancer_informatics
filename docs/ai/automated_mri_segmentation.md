# Automated 3D MRI Segmentation with nnU-Net

In [this tutorial](./3d_mri_segmentation.md) we learned how to segment a 3D MRI image with 3D Slicer. There, we had to set the segment seeds by ourselves before the software could calculate the segments. Another method, which doesn't require as much human input, is utilizing deep neural networks. In the following, we will use the pretrained deep learning model [nnU-Net](https://github.com/MIC-DKFZ/nnUNet) for automated image segmentation on our 3D MRI images. Be aware, that we only will use Python for a small part of this tutorial, but use the Linux shell for the rest of it. You can also use other operating systems, but the steps will differ from the ones described here.

## Install required packages

First of all, we need to install the required Python packages, on which nnU-Net depends. Because nnU-Net uses the PyTorch library, we need to install it first, before we install the nnU-Net package. In the Linux shell you can use the following commands. Pay attention, that you don't change the order.

```
pip install torch
pip install nnunetv2
```

## Set up datasets

### Directory structure

A special directory structure is required for nnU-Net to be able to access the data. First, create a new directory, in which you want to save your datasets. Now in this directory, create three more folders with the following names:
- nnUNet_raw
- nnUNet_preprocessed
- nnUNet_results

![](./Images/directories_nnunet.png "Directory structure for nnU-Net")

We can save new datasets in the "nnUNet_raw" directory. Every dataset has to have a specific name. It always starts with "Dataset", is followed by a three digit integer, which is the dataset ID, and ends with a description. In the following graphic you can see some examples.

![](./Images/datasets_nnunet.png "Datasets")

The ID and the description can be chosen by the user, but the ID should not collide with already existing ones, which you can find [here](https://github.com/MIC-DKFZ/nnUNet/tree/master/nnunetv2/dataset_conversion).

The last thing, we have to consider regarding the directory structure, is that every dataset folder has to include the following directories:
- imagesTr
- labelsTr

The "imagesTr" directory will include the training images and the "labelsTr" directory the corresponding segmentation files. You can also create a "imagesTs" folder, where you can save test images, but it is is not necessarily required for running nnU-Net.

### Adjust the file format

Our data needs to be transformed into a usable form for nnU-Net. nnU-Net supports different file formats. In this case we will use NRRD files. The associated segmentations to the MRI images need to be exported as labelmaps. For this, we will use 3D Slicer again.

First, open your DICOM file with the corresponding segmentation file in 3D Slicer. Now go to the "Segmentation Editor" and select "Import/Export nodes".

![](./Images/export_nodes.png "Export nodes")

Now, export a labelmap as shown below.

![](./Images/export_labelmap.png "Export labelmap")

The labelmap can now be found in the "Data" section.

![](./Images/slicer_data_labelmap.png "Labelmap")

To save the labelmap and the corresponding volume or image as NRRD files, follow these steps:
- Select "Save" from the toolbar.
- Tick "Show options" as shown in the graphic below.
- Chose "NRRD (.nrrd)" as file format.
- <ins>Do not tick "Compress"</ins> because nnU-Net needs uncompressed data.
- For our segmentation we used the volume *7 t1_fl3d_nonfs_tra_dyn*, so we save this file in the imagesTr directory and the segmentation file in the labelsTr directory.
- Save.

![](./Images/save_labelmap.png "Save files")

### Change the file names

The names of the training images (in the imagesTr directory) should include the description, an ID (three digit integer) and the channel or modality (four digit integer). The modality is the type of images, for example if your dataset contains MRI and ultrasound images, the MRI images could be the modality 0000 and the ultrasound images the modality 0001. Here are some examples:

![](./Images/img_nnunet.png "Images names")

The names of the corresponding segmentation files (in the labelsTr directory) should include the description and the image ID, to which the segmentation is associated:

![](./Images/segs_nnunet.png "Segmentation names")

### Generate a JSON file 

To save some meta data reguarding the dataset, a JSON file has to be generated. We can do this automatically by writing a short Python script, in which we use the `generate_dataset_json()` function from the nn-Unet package.

```python
from nnunetv2.dataset_conversion.generate_dataset_json import generate_dataset_json

generate_dataset_json('./nnUnet_raw/Dataset011_Breast', # path to the dataset directory
                        channel_names = {0: 'MRI'},
                        labels = {
                            'background': 0,
                            'fat tissue': 1,
                            'muscle': 2,
                            'lung': 3,
                            'gland': 4,
                            'air': 5
                        },
                        num_training_cases = 5, # amount of training cases
                        file_ending = '.nrrd')
```

The JSON file for example contains the names of the labels and which integer values are corresponding to what label. It also contains the number of training cases, so it can later be checked if this amount of training cases are really included in the dataset folder. For this example, the file should look like this:

```
{
    "channel_names": {
        "0": "MRI"
    },
    "labels": {
        "background": 0,
        "fat tissue": 1,
        "muscle": 2,
        "lung": 3,
        "gland": 4,
        "air": 5
    },
    "numTraining": 5,
    "file_ending": ".nrrd"
}
```

Your dataset directory should now be structured as shown in the following graphic.

![](./Images/dataset_directory_json.png "Dataset directory")

## Set environment variables

To make sure, that nnU-Net can locate the directories of your datasets, you have to set environment variables in your system. For this, open the .bashrc file in your /home directory and add the environment variables to the bottom as shown below.

```bash
export nnUNet_raw='/home/user/Documents/nnUNet/nnUNet_raw'
export nnUNet_preprocessed='/home/user/Documents/nnUNet/nnUNet_preprocessed'
export nnUNet_results='/home/user/Documents/nnUNet/nnUNet_results'
```

Be aware, that you have to chose the right path to the respective directory.

After you added the variables and saved the .bashrc file, you have to execute the following command in the Linux shell.

```
source ~/.bashrc
```

To test, if the environment variables are correctly set, you can also use the command `echo ${nnUNet_raw}` afterwards. If the right path of your nnUnet_raw directory is shown as output, you can go on to the next step of the tutorial. If the output is empty, you should check if you spelled everything right in the .bashrc file and try again. Don't forget to execute `source ~/.bashrc` once more, if you changed the file.

## Preprocess data

Before we can train the model with our images, the dataset has to be preprocessed. To do this, we can execute the following command:

```
nnUNetv2_plan_and_preprocess -d 011 --verify_dataset_integrity
```
The dataset ID "011" has to be exchanged for the right ID of your dataset, that you want to use.
After preprocessing, a new directory including a preprocessed version of your dataset should appear in the nnUNet_preprocessed directory.

## Train model

To train the model, we also just have to use one single command:

```
nnUNetv2_train 011 3d_lowres 1 -device cpu
```

Here are some of the options, that can be chosen from:

- "011" is again the ID of the used dataset.
- We chose "3d_lowres" because we have 3D images with a low resolution. There are also the options "3d_fullres", "2d" and "3d_cascade_lowres".
- As device it is recommended to use a powerful GPU, but if your computer doesn't have one, you can add "-device cpu" to execute the training on the CPU.

## References

- Isensee, F., Jaeger, P. F., Kohl, S. A., Petersen, J., & Maier-Hein, K. H. (2021). nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation. Nature methods, 18(2), 203-211.

- <https://github.com/MIC-DKFZ/nnUNet>

- <https://github.com/MIC-DKFZ/nnUNet/blob/master/documentation/set_environment_variables.md>

- <https://github.com/MIC-DKFZ/nnUNet/blob/master/documentation/how_to_use_nnunet.md>

- <https://github.com/MIC-DKFZ/nnUNet/blob/master/documentation/dataset_format.md>

- <https://github.com/MIC-DKFZ/nnUNet/blob/master/nnunetv2/dataset_conversion/generate_dataset_json.py>

- <https://pytorch.org/>

- <https://www.slicer.org/>