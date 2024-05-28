



const getAdmin = asyncErrorHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        message:"Authorized",
        authorized:true
    })
})
const allOrders = asyncErrorHandler(async(req, res)=>{
    const orders = await Order.find({}).populate({
        path:'products.product user',
        select:'name shortdesc price'
    }).sort({createdAt:-1})
    res.status(200).json({success:true, message:"All orders",orders:orders})
})
const getAllUsers = asyncErrorHandler(async(req, res)=>{
    const users = await User.find({}).sort({createdAt:-1})
    res.status(200).json({
        success:true,
        message:"All users",
        users
    })
})


const createProduct = asyncErrorHandler(async(req, res)=>{
    const { name, description, price, category, quantity, photo, shipping, shortdesc } = req.body
    if( !name || !description || !price || !category || !shortdesc) throw new CustomError('Necessary details are not filled', 404)

    const product = await new Product({name, slug:slugify(name), shortdesc,description, price, category, quantity, photo, shipping}).save()

    res.status(200).json({
        success:true,
        message:"Product added successfully",
        product
    })
})
const updateProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id

    const product = await Product.findByIdAndUpdate(id, {$set:{...req.body}}, {runValidators:true, new:true})

    res.status(200).json({
        success:true,
        message:"Product updated successfully",
        product
    })
})
const deleteProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id
    await Product.findByIdAndDelete(id).select('-photo')

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})

const orderStatus = asyncErrorHandler(async(req, res)=>{
    const { orderId } = req.params
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(orderId, {status}, {new:true, runValidators:true})

    res.status(200).json({
        success:true,
        message:"Order updated succesfully",
        order
    })
})

