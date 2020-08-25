import React, { useState, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import DevicesIcon from "@material-ui/icons/Devices";
import GroupIcon from "@material-ui/icons/Group";
import { Link, withRouter, useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HomeFragments from "../homefragments/homeFragments";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Imageside from "../adminAssets/sidebar-4.jpg";
import Modal from "@material-ui/core/Modal";
import { useForm } from "../../hooks/useInputs";
import { isStringEmpty, isNumberEmpty } from "../../utils/validation";
import { upload } from "../../requests/categories";
import { ToastContainer, toast, zoomn, bounce } from "react-toastify";

import {
  addCategoryRequest,
  getSubCategoryRequest,
} from "../../requests/categories";
import { deleteCategorie } from "../../requests/categories";

import { useDidMount } from "../../hooks/useLifeCycle";
import useApiState from "../../hooks/useApiState";
import { decodeUri } from "../../utils/url";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import { Card, Col, Row, Form, Carousel, Dropdown } from "react-bootstrap";
import Button from "@material-ui/core/Button/Button";
import ImageUpload from "../imageUpload";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { getCategories } from "../../requests/categories";
import { addSubCategoryRequest } from "../../requests/categories";
import Checkbox from "@material-ui/core/Checkbox";
import Tags from "./TagsInput";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MaterialTable from "material-table";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxSharpIcon from "@material-ui/icons/IndeterminateCheckBoxSharp";
import "../scss/categoriesAdmin.scss";

const drawerWidth = 280;

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const ClippedDrawer = ({ location, match }) => {
  const [formState, formActions] = useForm({
    initialValues: {
      label: "",
    },
    validation: {
      label: isStringEmpty,
    },
  });
  const history = useHistory();
 
  const { values, errors, touched } = formState;
  const { handleChange } = formActions;
  const { from } = decodeUri(location.search);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [addCategoryState, addCategory] = useApiState(addCategoryRequest);
  const [addSubCategoryState, addSubCategory] = useApiState(
    addSubCategoryRequest
  );
  const successtoast = () => {
    toast.success("vous avez ajouter une sous-categorie avec success", {
      draggable: true,
      postion: toast.POSITION.BOTTOM_CENTER,
      autoClose: 5000,
    });
    setOpens(false);
    setOpen(false);
    setOpenModal(false);

  };
  const [flip, setFlipped] = useState(false);
  const toggleFlipped = () => setFlipped(!flip);
  const [subCategoryParent, setSubCategoryParent] = useState("");

  const [imageCategory, setImageCategory] = useState();

  const [image, setImage] = useState();
  const [icon, setIcon] = useState();
  const [modifyImage, setModifyImage] = useState();
  const [modifyIcon, setModifyIcon] = useState();
  const [view, setView] = useState(false);
  const toggleView = () => setView(!view);

  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalCategory, setOpenModalCategory] = React.useState(false);

  const [caractéristique, setCaractéristique] = useState([
    { name: "", type: "field", options: [] },
  ]);

  const onChange = (e, i) => {
    const nextCaractéristique = [...caractéristique];
    console.log(e.target.value,"test1")

    nextCaractéristique[i] = {
      ...nextCaractéristique[i],
      name: e.target.value,
    };
    setCaractéristique(nextCaractéristique);
  };
  const onOptionChange = (options, i) => {
    const nextCaractéristique = [...caractéristique];
    console.log(options,"test2")
    nextCaractéristique[i] = { ...nextCaractéristique[i], options };
    setCaractéristique(nextCaractéristique);
  };
  const onTypeChange = (e, i) => {
    const nextCaractéristique = [...caractéristique];
    console.log(e.target.value,"test3")

    nextCaractéristique[i] = {
      ...nextCaractéristique[i],
      type: e.target.value,
    };
    setCaractéristique(nextCaractéristique);
  };
  const handleOpenModalCategory = () => {
    setOpenModalCategory(true);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpens = () => {
    setOpens(true);
  };
  const galleryImageList = [
    "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
    "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg",
  ];
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalCategory = () => {
    setOpenModalCategory(false);
  };
  const handleCloses = () => {
    setOpens(false);
  };
  const [rows, setRows] = useState([]);
  const [val, setVal] = useState([]);
  const [categoryState, categoryCall] = useApiState(getCategories);
  const [subState, subCall] = useApiState(getSubCategoryRequest);
  useDidMount(() => {
    categoryCall();
  });
  useEffect(() => {
    if (!openModalCategory) {
      formActions.setValues({ label: "" });
      setCaractéristique([{name:"",type:"field",options:[]}]);
      setSubCategoryParent("");
    }
  }, [openModalCategory]);
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const uri = match.params;

  function addsuBCategory(id) {
    setSubCategoryParent(id);
    setOpens(true);
    subCall(id);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const url = await upload(image);
    const urlicon = await upload(icon);
    const { label } = formState.values;

    if (formActions.validateForm()) {
      const add = subCategoryParent ? addSubCategory : addCategory;
      add({
        label,
        image: url.url,
        icon: urlicon.url,
        category: subCategoryParent || null,
        characteristics: caractéristique,
      });
      successtoast();
    } else {
      formActions.setAllTouched(true);
    }
   
  }

  const i = 0;
  console.log(caractéristique,"carac");
  const secondBody = (
    <div style={modalStyle} className="modalcontainer">
      <MaterialTable
        actions={[
          {
            icon: "edit",
            tooltip: "Modifier sous-categorie",
            onClick: (event, rowData) => {
              setOpenModalCategory(true);
              formActions.setValues({ label: rowData.label });
              setCaractéristique(rowData.characteristics);
              setModifyImage(rowData.image);
              setModifyIcon(rowData.icon);
            },
          },
        ]}
        columns={[
          {
            title: "Label",
            field: "label",
          },
          {
            title: "Image",
            field: "imgUrl",
            render: (rowData) => (
              <img
                src={rowData.imageUrl}
                style={{ width: 40, borderRadius: "50%" }}
              />
            ),
          },

          {
            title: "Caractérestique",
            field: "Caractérestique",
            render: (rowData) => {
              return (
                <Form.Control
                  as="select"
                  onChange={handleChange}
                  name="category"
                >
                  {rowData.characteristics &&
                    rowData.characteristics.map((row) => {
                      return <option key={row.name}>{row.name}</option>;
                    })}
                </Form.Control>
              );
            },
          },
        ]}
        data={
          subState.data
            ? subState.data.map((row) => ({
                label: row.label,
                imageUrl: row.image,
                iconUrl: row.icon,
                ...row,
              }))
            : []
        }
        options={({ search: false }, { pageSize: 5 })}
        editable={
          {
            /*   onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }), */
            /*  onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }), */
            /*   onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),  */
          }
        }
      />

      <div className="btn-one">
        <Button
          variant="contained"
          color="secondary"
          className="btn-sous"
          onClick={handleOpenModal}
        >
          Ajouter sous categorie
        </Button>
      </div>
    </div>
  );
  //------------
  const body = (
    <div style={modalStyle} className="modalcontainer">
      {/* 
      
      */}
      <Grid container className="trythis">
        <Form onSubmit={onSubmit} className="formimg">
          <Grid item xs={12} className="titcontainer">
            <h1 className="familytitle" onClick={toggleFlipped}>
              Ajout categorie
            </h1>{" "}
          </Grid>
          <Grid item xs={12} className="titcontainer">
            <Form.Control
              type="text"
              name="label"
              placeholder="Label"
              onChange={handleChange}
              value={values.label}
              className="chooselabel"
            />
            {touched.label && errors.label && (
              <div>
                <ErrorIcon className="errorIcon" fontSize="small" />
                <span className="errorMessage">{errors.label}</span>
              </div>
            )}
          </Grid>
          {/*     <Form.Group>
                  <Form.File
                    id="exampleFormControlFile1"
                    onChange={(event) => setImage(event.target.files[0])}
                    className="imgmarg"
                  />
                </Form.Group>  */}
          <Grid item className="another-fix">
            <center className="labels">Choisir une image</center>

            <Form.Group className="fixImage">
              <ImageUpload
                cardName="Input Image"
                imageGallery={galleryImageList}
                onChange={(event) => setImage(event.target.files[0])}
              />
            </Form.Group>
          </Grid>
          <Grid item className="another-fix">
            <center className="labels">Choisir une icon</center>

            <Form.Group className="fixImage">
              <ImageUpload
                cardName="Input Image"
                imageGallery={galleryImageList}
                onChange={(event) => setIcon(event.target.files[0])}
              />
            </Form.Group>
          </Grid>
          <Button
            variant="outlined"
            className="addproductbtn-cat"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Grid>
    </div>
  );

  const thirdBody = (
    <div style={modalStyle} className="mod-container">
      <center className="sc-title">Ajouter sous-categorie</center>
      <div className="center-tf">
        <TextField
          name="label"
          id="outlined-basic"
          label="label"
          variant="outlined"
          className="tf-label"
          onChange={handleChange}
          value={values.label}
        />
      </div>
      <div className="sc-img">
        <div className="sc-fix">
          <center className="sc-first">choisir image</center>
          <ImageUpload
            cardName="Input Image"
            imageGallery={galleryImageList}
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <div className="sc-fix">
          <center className="sc-first"> choisir icon</center>

          <ImageUpload
            cardName="Input Image"
            imageGallery={galleryImageList}
            onChange={(event) => setIcon(event.target.files[0])}
          />
        </div>
      </div>
      <div className="sc-walid">
        <div>
          {" "}
          <center className="sc-car">Carectéristiques :</center>
        </div>
        {caractéristique.map((value, index) => {
          return (
            <div>
              <div key={index} style={{ display: "flex" }}>
                <div className="container-cq">
                  <TextField
                    label="name"
                    variant="outlined"
                    className="sc-btnadd"
                    value={value.name}
                    onChange={(e) => onChange(e, index)}
                  />

                  <select
                    as="select"
                    className="sc-selct"
                    name="type"
                    onChange={(e) => onTypeChange(e, index)}
                  >
                    <option value="" disabled>Sélectionner le type</option>
                    <option value="field">Field</option>
                    <option value="select">Select</option>
                  </select>
                </div>

                <div className="sc-margin">
                  {caractéristique.length > 1 && (
                    <div
                      onClick={() =>
                        setCaractéristique(
                          caractéristique.filter((v, i) => index !== i)
                        )
                      }
                    >
                      <IndeterminateCheckBoxSharpIcon className="sc-moins" />
                    </div>
                  )}
                  {index === caractéristique.length - 1 && (
                    <div
                      onClick={() =>
                        setCaractéristique([
                          ...caractéristique,
                          { name: "", options: [], type: "field" },
                        ])
                      }
                    >
                      <AddBoxIcon className="sc-addbox" />
                    </div>
                  )}
                </div>
              </div>{" "}
              <div>
                <Tags
                  value={value.options}
                  onChange={(option) => onOptionChange(option, index)}
                />
              </div>
            </div>
          );
        })}
        <div className="btn-one-cs">

          <Button
            variant="contained"
            color="secondary"
            className="btn-sous-sc"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
        <div className="sc-space"></div>
      </div>
    </div>
  );
  //forth
  const forthBody = (
    <div style={modalStyle} className="mod-container">
      <center className="sc-title">Modifier sous-categorie</center>
      <div className="center-tf">
        <TextField
          name="label"
          id="outlined-basic"
          label="label"
          variant="outlined"
          className="tf-label"
          onChange={handleChange}
          value={values.label}
        />
      </div>
      <div className="sc-img">
        <div className="sc-fix">
          <center className="sc-first">choisir image</center>
          <ImageUpload
            initialImage={modifyImage}
            cardName="Input Image"
            imageGallery={galleryImageList}
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <div className="sc-fix">
          <center className="sc-first"> choisir icon</center>

          <ImageUpload
            initialImage={modifyIcon}
            cardName="Input Image"
            imageGallery={galleryImageList}
            onChange={(event) => setIcon(event.target.files[0])}
          />
        </div>
      </div>
      <div className="sc-walid">
        <div>
          {" "}
          <center className="sc-car">Carectéristiques :</center>
        </div>
        {caractéristique.map((value, index) => {
          return (
            <div>
              <div key={index} style={{ display: "flex" }}>
              {/*   <TextField
                  label="Caractérisqtique"
                  variant="outlined"
                  className="sc-btnadd"
                  value={value}
                  onChange={(e) => onChange(e, index)}
                /> */}
                <div className="container-cq">
                  <TextField
                    label="name"
                    variant="outlined"
                    className="sc-btnadd"
                    value={value.name}
                    onChange={(e) => onChange(e, index)}
                  />

                  <select
                    as="select"
                    className="sc-selct"
                    name="type"
                    onChange={(e) => onTypeChange(e, index)}
                  >
                    <option value="" disabled>Sélectionner le type</option>
                    <option value="field">Field</option>
                    <option value="select">Select</option>
                  </select>
                </div>
                <div className="sc-margin">
                  {caractéristique.length > 1 && (
                    <div
                      onClick={() =>
                        setCaractéristique(
                          caractéristique.filter((v, i) => index !== i)
                        )
                      }
                    >
                      <IndeterminateCheckBoxSharpIcon className="sc-moins" />
                    </div>
                  )}
                  {index === caractéristique.length - 1 && (
                    <div
                      onClick={() =>
                        setCaractéristique([
                          ...caractéristique,
                          { name: "", options: [], type: "field" },
                        ])
                      }
                    >
                      <AddBoxIcon className="sc-addbox" />
                    </div>
                  )}
                </div>
              </div>{" "}
              <div>
                <Tags
                  value={value.options}
                  onChange={(option) => onOptionChange(option, index)}
                />
              </div>
            </div>
          );
        })}
        <div className="btn-one-cs">
          <Button
            variant="contained"
            color="secondary"
            className="btn-sous-sc"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
        <div className="sc-space"></div>
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
                <ToastContainer />

        {" "}
        <img src={Imageside} className="imgdash"></img>
        <div className="drawercontainer">
          <List>
            <Link to="/admin/home" className="labelhome">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon className="labelhome" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/admin/categories" className="labelhome">
              <ListItem button className="actuallabelhome">
                <ListItemIcon>
                  <CategoryIcon className="labelhome" />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
            </Link>
            <Link to="/admin/products" className="labelhome">
              <ListItem button>
                <ListItemIcon>
                  <DevicesIcon className="labelhome" />
                </ListItemIcon>
                <ListItemText primary="Produits" />
              </ListItem>
            </Link>
            <Link to="/" className="labelhome">
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon className="labelhome" />
                </ListItemIcon>
                <ListItemText primary="Commandes" />
              </ListItem>
            </Link>
            <Link to="/" className="labelhome">
              <ListItem button className="labelhome">
                <ListItemIcon>
                  <GroupIcon className="labelhome" />
                </ListItemIcon>
                <ListItemText primary="Users" className="labelhome" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            {["Deconnexion"].map((text, index) => (
              <ListItem button key={text} className="labelhome">
                <ListItemIcon>
                  <ExitToAppIcon className="labelhome" />{" "}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography>
          <Grid container className="bothcardContainer" spacing={2}>
            <Grid item xs>
              <Paper className="consultContainer">
                <div className="consult">
                  <PlaylistAddIcon onClick={handleOpen} className="testicon" />
                </div>
                <div className="contentTest">
                  <h3>Add Categorie</h3>
                  <p>
                    Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum
                  </p>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
                <Modal
                  open={opens}
                  onClose={handleCloses}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {secondBody}
                </Modal>
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {thirdBody}
                </Modal>
                <Modal
                  open={openModalCategory}
                  onClose={handleCloseModalCategory}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {forthBody}
                </Modal>
              </Paper>{" "}
            </Grid>
            <Grid item xs>
              <Paper className="consultContainerthree">
                <div className="consultthree" onClick={toggleView}>
                  <CategoryIcon className="testiconthree" />
                </div>
                <div className="contentTestthree">
                  <h3>Consulter Categories</h3>
                  <p>
                    Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum
                  </p>
                </div>
              </Paper>{" "}
            </Grid>
          </Grid>
          <Grid container className={view ? "tabcontain" : "tabnotcontain"}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nom</StyledTableCell>
                    <StyledTableCell>Image</StyledTableCell>

                    <StyledTableCell align="right">
                      Ajouter sous-categories
                    </StyledTableCell>

                    <StyledTableCell align="right">Modifier</StyledTableCell>
                    <StyledTableCell align="right">Supprimer</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryState.data &&
                    categoryState.data.map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {row.label}
                        </StyledTableCell>
                        <StyledTableCell className="img-fix" align="right">
                          <img className="img-consult" src={row.image} />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <AddCircleIcon
                            onClick={() => addsuBCategory(row._id)}
                            className="addicon"
                          />
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <EditIcon className="edicon" />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <DeleteForeverIcon
                            onClick={() =>
                              deleteCategorie({ id: row._id }).then(() => {
                                categoryCall();
                              })
                            }
                            className="delicon"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Typography>
      </main>
    </div>
  );
};
export default ClippedDrawer;
