import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layouts/layout';
import styled from 'styled-components';
import DeleteModel from '../../components/delete_model';
import Input from '../../components/input';
import CustomModel from '../../components/custom_model';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, deleteRecipe, getRecipe } from '../../actions/recipes_action';
import { Navigate, useParams } from 'react-router-dom';
import Message from '../../components/message';


export default function RecipeView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect called");
    dispatch(getRecipe(id));
  }, []);
  
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [name, setRecipeName] = useState();
  const [ingredients, setIngredients] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [showEditAlert, setEditAlertShow] = useState(false);
  const [showDeleteAlert, setDeleteAlertShow] = useState(false);
  const [showErrorAlert, setErrorAlertShow] = useState(false);
  //const navigate = useNavigate();
  const recipe = useSelector(state => state.recipes.viewRecipe);


  const handleImage = (e) => setImage(e.target.files[0]);
  const handleEditShow = () => setShowEdit(true);
  const handleEditClose = () => setShowEdit(false);

  const handleDeleteShow = () => setShowDelete(true);
  const handleDeleteClose = () => setShowDelete(false);
  

  const showEditMsgBox = () => {
    setEditAlertShow(true);
    setTimeout(() => {
      setEditAlertShow(false)
    }, 2000);
  }

  const showDeleteMsgBox = () => {
    setDeleteAlertShow(true);
    setTimeout(() => {
      setDeleteAlertShow(false)
    }, 2000);
  }

  const showErrorMsgBox = () => {
    setErrorAlertShow(true);
    setTimeout(() => {
      setErrorAlertShow(false)
    }, 2500);
  }

  const editRecipe = () => {
    const recipeForm = new FormData();
    if (name)
        recipeForm.append('name', name);
    if (ingredients)
        recipeForm.append('ingredients', ingredients);
    if (description)
        recipeForm.append('description', description);
    if (image)
        recipeForm.append('image', image);
    if (recipeForm.entries().next().value){
      dispatch(updateRecipe(recipeForm, recipe._id));
      setShowEdit(false);
      showEditMsgBox();
      setRecipeName();
      setIngredients();
      setImage();
      setDescription()
    }else{
      showErrorMsgBox();
    }
  }

  const deleteRecipeEvent = () => {
    dispatch(deleteRecipe(recipe._id));
    setShowDelete(false);
    showDeleteMsgBox();
  }

  if (recipe === 'deleted')
    return <Navigate to='/' />


  return (
    <Layout>
      {/* Edit success message */}
      <Message show={showEditAlert} variant='primary' message='Recipe Update successful!' onClose={() => setEditAlertShow(false)} />
      {/* Delete success message */}
      <Message show={showDeleteAlert} variant='warning' message='Recipe Delete successful!' onClose={() => setDeleteAlertShow(false)} />
      

      <StyledDiv>
        <Container fluid>
          <Row>
            <Col>
              <RecipeImage image={recipe.image} />

            </Col>

            <Col>
              <Container className='container-name'>{recipe.name}</Container>
              <Container className='label'>Ingredients</Container>
              <Container className='container-ingredients'>{recipe.ingredient}</Container>
              <Container className='label'>Description</Container>
              <Container className='container-description'>{recipe.description}</Container>

              <Row className='row-button'>
                <Col><Button className='button-edit' variant="warning" onClick={handleEditShow}>Edit</Button></Col>
                <Col><Button variant="danger" onClick={handleDeleteShow}>Delete</Button></Col>

              </Row>
            </Col>
          </Row>
        </Container>
      </StyledDiv>

      {/* Delete warning dialog */}
      <DeleteModel
        show={showDelete}
        handleClose={handleDeleteClose}
        onDelete={deleteRecipeEvent}
      />

      {/* Edit recipe dialog box */}
      <CustomModel
        title='Edit Recipe'
        showAddModel={showEdit}
        onHide={handleEditClose}
        add={editRecipe}>
          {/* Error message */}
      <Message show={showErrorAlert} variant='danger' message='All felids are empty!' onClose={() => setErrorAlertShow(false)} />
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
  );
}

const RecipeImage = styled.div`
    height:500px;
    width:80%;
    background-size: cover;

    border-radius:15px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    background-image:url('${props => props.image}')
`;

const StyledDiv = styled.div`
    .row-button{
      position: absolute;
      display:flex;
      bottom: 0;
      margin-bottom:16px
    }

    button{
      width:120px;
    }
    .button-edit{
      --bs-btn-active-color: #f1e4e4;
      color:white;
    }
    .container-name{
      margin-bottom:16px;
      font-weight:bold;
      font-size:1.8rem;
      text-transform: uppercase;
    }
    .container-ingredients{
      margin-bottom:16px;
    }
    .label{
      color:orange;
      font-weight:bold
    }
`;
