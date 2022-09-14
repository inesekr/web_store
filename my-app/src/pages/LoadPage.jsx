import React from 'react';
import ProductsFile from '../ProductsFile';

class LoadPage extends React.Component {

    constructor() {
        super();
        this.state = {
            filename: "",
            filepath: "",
            load: false
        }
    }

    onFileNameChange = (event) => {
        const filename = event.target.files[0].name;
        this.setState({ filename: filename, filepath: event.target.value });
    }

    render() {
        return (
            <div>
                <input type="file" value={this.state.filepath}
                    onChange={this.onFileNameChange}></input>
                <button className='btn' onClick={() => { this.setState({ load: true }) }}>Load</button>
                {this.state.load === true && <ProductsFile filename={this.state.filename}></ProductsFile>}
            </div>
        )
    }
}
export default LoadPage;