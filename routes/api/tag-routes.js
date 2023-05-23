const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      Attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      Attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    res.status(500).json(err)
    console.log(err);
  })
});

router.post('/', async (req, res) => {
  // create a new tag/category
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData){
      res.status(404).json({ message: `Couldn't find item with this id`});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData){
      res.status(404),json(err);
    }
  });
});

module.exports = router;
