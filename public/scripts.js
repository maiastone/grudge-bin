$(document).ready(function() {
	fetchGrudges();
});

function fetchGrudges() {
	axios.get('/api/grudges')
	.then(function (response) {
		appendDOM(response.data);
	})
	.catch(function(error) {
		console.log('Error receiving grudges');
	})
}

function appendDOM(grudges) {
	grudges.map(function(grudge) {
		$('.grudge-container').append(`
			<h1>${grudge.name}</h1>
      <h2>${grudge.offense}</h2>
      <h3>${grudge.forgiven}</h3>
      <h3>${grudge.date}</h3>
			`);
	});
}

$('.submit').on('click', function(e) {
	e.preventDefault();
  const newGrudge = {
    name: $('.name-entry').val(),
    offense: $('.offense-entry').val()
  }
  postGrudge(newGrudge);
});

function postGrudge(newGrudge) {
  axios.post('/api/grudges', newGrudge)
  .then((response) => {
    appendNewGrudge(response);
  })
  .catch((error) => {
    console.log(error);
  });

  function appendNewGrudge(response) {
    for (let i=0; i<response.data.length; i++) {
      if (newGrudge.name === response.data[i].name) {
        $('.grudge-container').append(`
          <h1>${response.data[i].name}</h1>
          `);
        }
      }
    }
}
