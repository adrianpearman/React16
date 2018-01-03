import React, { Component } from 'react'
import Aux from '../../HOC/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.70,
  bacon: 0.80,
  cheese: 0.75,
  meat: 1.50
}

class BurgerBuilder extends Component {

  constructor(props){
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      ableToPurchase:false,
      purchasing: false
    }
  }

updatePuchaseState(ingredients){
  const sum = Object.keys(ingredients)
    .map(ingKey => {
        return ingredients[ingKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)
    this.setState({ableToPurchase: sum > 0})
}

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({
     totalPrice: newPrice,
     ingredients: updatedIngredients
    })
    this.updatePuchaseState(updatedIngredients)
  }

  deleteIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceAddition
    this.setState({
     totalPrice: newPrice,
     ingredients: updatedIngredients
    })
    this.updatePuchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('You Continue!')
  }

  render(){
    const disableInfo = {
      ...this.state.ingredients
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    return(
      <Aux>
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}
          >
            <OrderSummary
              ingredients={this.state.ingredients}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
            />
          </Modal>
          <Burger ingredients={this.state.ingredients}/>
          <BurgerControls
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientsRemoved={this.deleteIngredientHandler}
            disabled={disableInfo}
            ableToPurchase={this.state.ableToPurchase}
            ordered={this.purchaseHandler}
          />
      </Aux>
    )
  }
}

export default BurgerBuilder