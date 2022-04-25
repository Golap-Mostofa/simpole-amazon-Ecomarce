import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import { addToDb, getStordcart } from '../../../utilities/fakedb';
import Card from '../../Card/Card';
import Product from '../../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products,setProducts] = useProducts()
    const [cart, setCart] = useState([]);
     const [pageCount,setPageCount] = useState(0)
     const [page,setPage] = useState(0)
    const [size,setSize] = useState(10)

     useEffect(()=>{
         fetch('http://localhost:5000/productCount')
         .then(res =>res.json())
         .then(data =>{ 
             const count = data.count;
             const pages = Math.ceil(count/10)
             setPageCount(pages)
         })
     },[])

    useEffect(()=>{
        // console.log('localst',products);
        const savedCart = []
        const storedCart = getStordcart()
        // console.log(storedCart);
        for(const id in storedCart){
            const addProduct = products.find(product =>product._id ===id)
            if(addProduct){
                const quantity = storedCart[id]
                addProduct.quantity = quantity
                savedCart.push(addProduct)
            }
             
        }
        setCart(savedCart)
        // console.log('localstoresfece');
    },[products])

    const hendelAddTocart=(selecetedproduct)=>{
        // console.log(selecetedproduct);
        let newCart = []
        const existe = cart.find(prodact => prodact._id === selecetedproduct._id)
        if(!existe){
            selecetedproduct.quantity = 1
            newCart = [...cart, selecetedproduct]
        }else{
            const rest = cart.filter(product=>product._id !== selecetedproduct._id)
            existe.quantity = existe.quantity +1
            newCart = [...rest,existe]
        }
        
       
        setCart(newCart)
        addToDb(selecetedproduct._id)
       
    }

    return (
        <div className='shop-container'>
            <div className="prodacts-container">
               {
                   products.map(product=><Product
                     key={product._id}
                     product={product}
                    hendelAddTocart={hendelAddTocart}
                     ></Product>)
               }
               <div className='pagination'>
                   {
                       [...Array(pageCount).keys()]
                       .map(number => <button
                       className={page === number ? "selected" : ''}
                       onClick={() =>setPage(number)}
                       >{number}</button>)
                   }
                   {size}
                   <select onChange={e=>setSize(e.target.value)} id="">
                       <option value='5'>5</option>
                       <option value='10' selected>10</option>
                       <option value='15'>15</option>
                       <option value='20'>20</option>
                   </select>
               </div>
            </div>
            <div className="card-container">
              <Card card={cart}>
                <Link to='/orders'>
                    <button>Review Order</button>
                </Link>
              </Card>
            </div>
        </div>
    );
};

export default Shop;