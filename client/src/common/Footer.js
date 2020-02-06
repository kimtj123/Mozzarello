import React from 'react';

export default function Footer() {

  return (
    <div>      
      <div style = {styles.image}>        
        <img src = {require('./Mozzarello.png')} alt = "Mozzallo logo"/>
        <h3>Mozzarello © Established at 2019</h3>
      </div>
    </div>
  );
}

const styles = { 

 image : {
    paddingTop: "2vh",
    textAlign: "center"
 }
}