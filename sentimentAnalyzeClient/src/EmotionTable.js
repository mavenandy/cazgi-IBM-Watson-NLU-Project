import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
  render() {
    return (  
      <div>
      <table className="table table-bordered">
          <thead>
            <tr>
              <th>Emotion</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.keys(this.props.emotions).map((key, i) => (
              <tr key={i}>
                  <td>{key}</td>
                  <td>{this.props.emotions[key]}</td>
              </tr>
            ))
          }
          </tbody>
      </table>
      </div>
    );
  }
}
export default EmotionTable;
