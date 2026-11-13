<h1 align="center"><i>SilvaScenes</i>: Challenges of Automating<br>Tree Detection and Species Classification<br>from Under-Canopy Images in Natural Forests</h1>

<p align="center">
  <img src="https://norlab-ulaval.github.io/SilvaScenes/static/images/annotated_example.jpg" alt="Annotated image from SilvaScenes" width="700">
</p>

## Description

*SilvaScenes* is a benchmark dataset of handheld, ground-level RGB images for instance segmentation of tree species in natural forests. Collected across 40 stands, 11 forests, and five bioclimatic domains in Quebec, Canada, it features 2818 trees from 36 species in 319 images, with segmentation masks for pixel-precise trunk detection and fine-grained species annotations from forestry experts. We benchmark Mask2Former, YOLOv11, and YOLOv12 on the dataset, showing that while trunk segmentation may be feasible, species-aware segmentation remains a significant challenge.

The dataset, source code, and trained models will be released soon. Visit the [project page](https://norlab-ulaval.github.io/SilvaScenes/) for more details on the dataset!

## Contact

For questions about the dataset or the paper, please contact David-Alexandre Duclos (david-alexandre.duclos@norlab.ulaval.ca) or Philippe Giguère (philippe.giguere@ift.ulaval.ca).

## Citation

If you found our work interesting or useful, feel free to share it and cite it. Thanks!

> [!NOTE]
> Our work should be published shortly. Until then, please cite the arXiv preprint below. Note that the preprint does not include our up-to-date dataset and results.

```bibtex
@misc{duclos2026silvascenes,
  title         = {SilvaScenes: Tree Detection and Species Classification from Under-Canopy Images in Natural Forests},
  author        = {Duclos, David-Alexandre and Guimont-Martin, William and Jeanson, Gabriel and Larochelle-Tremblay, Arthur and Lapointe, Martine and Defosse, Th{\'e}o and Moore, Fr{\'e}d{\'e}ric and Nolet, Philippe and Pomerleau, Fran{\c{c}}ois and Gigu{\`e}re, Philippe},
  year          = {2026},
  eprint        = {2510.09458},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CV},
  url           = {https://arxiv.org/abs/2510.09458v2},
  note          = {arXiv:2510.09458v2}
}
```
