import './Shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Item(props) {
    return (
        <div key={props.id} onClick={() => props.callback(props)}>
            <img src={props.img} width={200} height={200} alt={props.name} /><br />
            id: {props.id} <br />
            name: {props.name}<br />
            price: {props.price}<br />
        </div>
    );
}

export default function Shop() {
    const [products,setProducts]=useState([]);
    const URL="https://redesigned-giggle-r444795rpp5q2w5p-5000.app.github.dev"
    useEffect(()=>{
        axios.get(URL+"/api/products")
        .then(response=>{
            setProducts(response.data)
        })
        .catch(error=>{
            console.log("error")
        })
    }
    ,[]);

    const [cart, setCart] = useState([]);

    function addCart(item) {

        setCart([...cart, { id: item.id, name: item.name, price: item.price, img: item.img }]);
    }

    function remove(index) {
        let indexx=index+1;
        alert("index at"+ indexx);
        setCart(cart.filter((i, _index) => index != _index));
    } 
    function remove1(index) {
        
        const updatedCart = [...cart]; 
        updatedCart.splice(index, 1); 
        setCart(updatedCart); 
    }

    const productList = products.map(item => <Item key={item.id} {...item} callback={addCart} />);
    const cartList = cart.map((item, index) => (
        <li key={index}>
            {item.id+1} {item.name} {item.price}
            <button onClick={() => remove(index)}>Delete</button>

        </li>
    ));

    let total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <>
            <div className='grid-container'>{productList}</div>

            <h1>Cart</h1>
            <button onClick={() => setCart([])}>Clear cart</button>
            <ol>{cartList}</ol>
            <h1>รวมราคาทั้งหมด {total} </h1>
        </>
    );
}
