import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>( )
  const {id} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDataPizza = async() => {
    try {
      const {data} = await axios.get(`https://64d663f02a017531bc12965c.mockapi.io/kfdl/${id}`)
      setPizza(data)
    } catch (error) {
      navigate('/')
      console.warn(error)
      alert('Не удалось загрузить данную пиццу')
    }
    }
    fetchDataPizza();
  }, [])
  if(!pizza) {
    return 'Loading...'
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} </h4>
    </div>
  )
}
