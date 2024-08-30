const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
},
  description: { 
    type: String, 
    required: true
},
  price: { 
    type: Number, 
    required: true 
},
  category: { 
    type: String, 
    required: true 
},
  stockQuantity: { 
    type: Number, 
    default: 0 },
  dateAdded: { 
    type: Date, 
    default: Date.now 
}
});

module.exports = mongoose.model('Product', ProductSchema);
