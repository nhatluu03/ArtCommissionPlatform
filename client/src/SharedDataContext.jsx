// // SharedDataContext.js
// import React, { createContext, useState } from 'react';

// const SharedDataContext = createContext();

// const SharedDataProvider = ({ children }) => {
//   const [sharedData, setSharedData] = useState(null);

//   const updateSharedData = async () => {
//     // try {
//     //   const response = await fetch('your-api-endpoint');
//     //   const data = await response.json();
//     //   setSharedData({name:"kkk"});
//     // } catch (error) {
//     //   // alert('Error fetching shared data:', error);
//     // }
//       setSharedData({name:"kkk"});
//   };

//   return (
//     <SharedDataContext.Provider value={{ sharedData, updateSharedData }}>
//       {children}
//     </SharedDataContext.Provider>
//   );
// };

// export { SharedDataContext, SharedDataProvider };
