import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/layout';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, getAllRecipes, setRecipe } from '../../actions/recipes_action';
import {  Col, Container, Row } from 'react-bootstrap';
import styled from "styled-components";
import Input from '../../components/input';
import CustomModel from '../../components/custom_model';
import RecipeCard from '../../components/recipe_card';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Message from '../../components/message';

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const [showAddModel, setShowAddModel] = useState(false);
  const [name, setRecipeName] = useState();
  const [ingredients, setIngredients] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [showAddAlert, setAddAlertShow] = useState(false);
  const [showErrorAlert, setErrorAlertShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  

  const handleClose = () => setShowAddModel(false);
  const handleShow = () => setShowAddModel(true);
  const handleImage = (e) => setImage(e.target.files[0]);

  const showAddMsgBox = () => {
    setAddAlertShow(true);
    setTimeout(() => {
      setAddAlertShow(false)
    }, 2000);
  }



  const showErrorMsgBox = () => {
    setErrorAlertShow(true);
    setTimeout(() => {
      setErrorAlertShow(false)
    }, 2500);
  }

  const viewRecipe = (recipe) => {
    dispatch(setRecipe(recipe));
    navigate(`/recipe/${recipe._id}`);
  }

  const addNewRecipe = () => {
    const recipeForm = new FormData();
    if (name && ingredients && description && image) {
      recipeForm.append('name', name);
      recipeForm.append('ingredients', ingredients);
      recipeForm.append('description', description);
      recipeForm.append('image', image);
      dispatch(addRecipe(recipeForm));
      handleClose();
      showAddMsgBox()
      setRecipeName();
      setDescription();
      setIngredients();
      setImage();
    } else {
      showErrorMsgBox();
    }
  }

  return (
    <Layout>
{/* Add success message */}
<Message show={showAddAlert} variant='primary' message='Recipe add successful!' onClose={() => setAddAlertShow(false)} />
      <Container style={{
        marginTop: 32,
        marginBottom: 16,
        display: "grid",
        width: "100%",
        justifyItems: 'center',
        padding: 0,
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridRowGap: "50px",
        gridColumnGap: "100px"
      }}>
        {recipes.recipes != null ? recipes.recipes.map(recipe =>
          <RecipeCard
            key={recipe._id}
            onClick={() => viewRecipe(recipe)}
            id={recipe._id}
            name={recipe.name}
            description={recipe.description}
            ingredients={recipe.ingredient}
            image={recipe.image}
          />) : null}
      </Container>


      <Fab
        onClick={handleShow}

        aria-label="add"
        style={{
          position: 'fixed',
          backgroundColor: "orange",
          bottom: 20,
          right: 16
        }}>
        <AddIcon style={{ color: 'white' }} />
      </Fab>

      {/* Add recipe dialog box */}
      <CustomModel
        title='Add Recipe'
        showAddModel={showAddModel}
        onHide={handleClose}
        add={addNewRecipe}>
        
         {/* Error message */}
        <Message show={showErrorAlert} variant='danger' message='All felids are require!' onClose={() => setErrorAlertShow(false)} />
        <Row>
          <Col>
            <Input
              type="text"
              controlId="name"
              label="Name"
              placeholder="Enter Recipe Name"
              value={name}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              type="file"
              controlId="image"
              name="image"
              label="Image"
              placeholder="Choose Recipe's Image"
              onChange={handleImage}
            />
          </Col>
        </Row>


        <Row>
          <Col>
            <Input
              as="textarea"
              rows={5}
              controlId="ingredients"
              label="Ingredients"
              placeholder="Enter Recipe Ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              as="textarea"
              rows={5}
              controlId="description"
              label="Description"
              placeholder="Enter Recipe Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

      </CustomModel>

    </Layout>
  )
}

const Grid = styled.div`
  margin-top: 100,
  margin-bottom: 16,
  display: grid,
  width: 100%,
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)),
  grid-gap: 12px,
`;
