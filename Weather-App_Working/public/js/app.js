   //! fetch api
   fetch('https://puzzle.mead.io/puzzle')
   .then((res) => res.json())
   .then((data) => {
     console.log(data);
   })
   .catch((err) => {
     console.error(err);
   });
