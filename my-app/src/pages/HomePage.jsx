import ProductsDB from '../ProductsDB';
import InputProduct from '../InputProduct';

function HomePage() {

    return (
        <div style={{ backgroundColor: 'lightyellow', paddingTop: "30px" }}>

            <InputProduct></InputProduct>

            <ProductsDB></ProductsDB>
        </div >
    );
}

export default HomePage;