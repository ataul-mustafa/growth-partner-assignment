// import React from 'react';
// import Chat from './components/Chat';
// import './App.css';

// const App = () => {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>AI Financial Assistant</h1>
//             </header>
//             <Chat />
//         </div>
//     );
// };

// export default App;
import React, { useState } from 'react';
import Groups from './components/Groups/Groups';
import Chats from './components/Chats/Chats';

function Home() {
  const [openedGrp, setOpenedGrp] = useState(null);
  const [closeNotes, setCloseNotes] = useState(true);

  const recieveClickedGrp = (i) =>{
    setOpenedGrp(i);
    setCloseNotes(false);
  }

  const closeFun = (val) =>{
    setCloseNotes(val);
  }

  return (
    <div style={{display: 'flex'}}>
        <Groups clickReciever={recieveClickedGrp} close={closeNotes} />
        <Chats openedGrp={openedGrp} closeChatsReciever={closeFun} />
    </div> 
  )
}

export default Home
