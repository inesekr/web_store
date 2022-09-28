import React from 'react';
import ProductsFile from '../ProductsFile';

class LoadPage extends React.Component {

    constructor() {
        super();
        this.state = {
            filename: "",
            filepath: "",
            load: false,
            user: JSON.parse(sessionStorage.getItem("user"))
        }
    }

    onFileNameChange = (event) => {
        const filename = event.target.files[0].name;
        this.setState({ filename: filename, filepath: event.target.value });
    }

    render() {
        return (

            < div >
                {
                    this.state.user.roleID === 1 &&
                    <div>

                        <input type="file" value={this.state.filepath}
                            onChange={this.onFileNameChange}></input>

                        <button type="button" className='btn' onClick={() => { this.setState({ load: true }) }}>Load</button>

                        {this.state.load === true && <ProductsFile filename={this.state.filename}></ProductsFile>}
                    </div>

                }
            </div >

        )
    }
}
export default LoadPage;