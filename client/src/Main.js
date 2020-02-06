import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

export default function Main(props) {  
    console.log("styles :: ")

  return (
    <div>
        <Header />
        <div style = {styles.wrapper1}>
            <div style = {styles.content}>
                <h1>모짜렐로를 방문해주셔서 감사합니다.</h1>
                <p>로그인하시고, 당신의 업무를 체계적으로 관리하세요.</p>
            </div>
        </div>
        <div style = {styles.wrapper2}>
            <div style = {styles.content}>
                <h1>직관적이고 간단합니다.</h1>
                <p>쉽지만 효율적인 모짜렐로는 당신의 성과를 높여줍니다.</p>
            </div>
        </div>
        <div style = {styles.wrapper3}>
            <div style = {styles.content}>
                <h1>모짜렐로를 친구들에게 공유해주세요.</h1>
                <p>페이스북, 트위터, 인스타그램 을 통해 지인들에게 이 놀라운 서비스를 공유하세요!</p>
            </div>
        </div>
        <Footer />
    </div>
  );
}


const styles = {
    wrapper1:
    {
        width : '100vw',
        height: '30vh',
        textAlign: 'center',
        display: 'table',
        margin: 'auto'
    },
    wrapper2:
    {
        width : '100vw',
        height: '30vh',
        textAlign: 'center',
        display: 'table',
        margin: 'auto',
        background: '#FDFAE5'
    },
    wrapper3:
    {
        width : '100vw',
        height: '30vh',
        textAlign: 'center',
        display: 'table',
        margin: 'auto',
        background: '#BCD9EA'

    },
    content:
    { 
        display: 'table-cell',
        verticalAlign: 'middle',
        margin: 'auto'
    }
}