const express=require('express');
const router=express.Router();
const Product=require('../../models/product');
const mongoose=require('mongoose');
const product = require('../../models/product');




router.get('/',(req, res, next)=>{
   Product.find().exec().then(docs=>{
       console.log(docs);
       res.status(200).json(docs);
   })
  
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error: err
       })
   });
});

router.post('/',(req, res, next)=>{
    
    const product=new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        company: req.body.company,
        expiry: req.body.expiry,

    });
    product.save().then(result=>{
        console.log(res);
    })
    .catch(err=>console.log(err));

    
    res.status(201).json({
        createdProduct: product,   
        message: 'handling POST req to /products'
        
    });
});
router.get('/:productId',(req, res, next)=>{
    const id=req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        if(doc){
        console.log(doc);
        res.status(200).json(doc);
        }
        else{
            res.status(404).json({message: 'File not Found'});
        }
    })
    .catch(err=>{console.log(err)
        res.status(500).json({error: err});
    });
   
    
});

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'pathced'
    });
});
router.delete('/:productId',(req,res,next)=>{
   const id=req.params.productId;
   Product.remove({_id: id}).exec().then(result=>{
       res.status(200).json(result);
   }).catch(err=>{
       console.log(err);
       res.status(404).json({
           error: err
       });
   });
});


router.get('/', async(req,res) => {
    //const id=req.params.id;
    let filter = [];
    for (let i = 1; i < req.query.price; i++) {
    filter.push(await Product.find({price: i}));
}

res.json(filter)
});



module.exports=router; 