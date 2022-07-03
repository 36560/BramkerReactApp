import useHttp from "../hooks/use-http";
import ProductForm from "./ProductForm";

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

const AddProduct = (props) => {
  const { isLoading, error, sendRequest: sendProductRequest } = useHttp();

  const createProduct = (addedProduct, mainCat) => {
    //ONLY to display
    const brutto = (
      Math.floor(
        (+addedProduct.cenaNetto * 0.23 + +addedProduct.cenaNetto) * 10
      ) / 10
    ).toFixed(2);
    const addedDisplayProduct = {
      id: addedProduct.name,
      name_product: addedProduct.nazwa,
      img: addedProduct.img,
      price_netto: addedProduct.cenaNetto,
      price_brutto: brutto,
      cat: mainCat,
    };
    console.log("added product: " + addedDisplayProduct.cat);
    props.onAddProduct(addedDisplayProduct);
  };

  const handleAddForm = async (newProduct, fetchSTR, selectedCat) => {
    //console.log(newProduct); //get new product from ProductForm

    sendProductRequest(
      {
        url: `${FIREBASE_URL}/${fetchSTR}.json`,
        method: "POST",
        body: newProduct,
        headers: {
          "Content-Type": "application/json",
        },
      },
      createProduct.bind(null, newProduct, selectedCat)
    );
  };

  return (
    <>
      <ProductForm
        loadingInfo={isLoading}
        button_title="Dodaj"
        onHandleForm={handleAddForm}
        onHide={props.onDisplay}
        subListAccesory={props.accessory}
        subListAutomats={props.automatsCat}
        type="add"
        title="Dodaj produkt"
      >
        <div className="error"> {error && <p>{error}</p>}</div>
      </ProductForm>
    </>
  );
};

export default AddProduct;
