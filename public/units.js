function renderGrudge(response) {
		return (`<h3 class='name'>${response.data[0].name}</h3>
		<h3>${response.data[0].offense}</h3>
		<h3 class='date'>${response.data[0].date}</h3>
		<button id=${response.data[0].id} class='forgive'>Forgive</button>`)
};


function appendDOM(grudges) {
	$('.grudge-container').html('');
	grudges.map(function(grudge) {
		$('.grudge-container').append(`
			<ul>
			<li id=${grudge.id} class='offender' class='name'>${grudge.name}</li>
			<ul>`);
	});
}

function sortNames(unsortedGrudges) {
	let sortedGrudges =  unsortedGrudges.sort(function (a, b) {
		var x = a.name.toLowerCase();
		var y = b.name.toLowerCase();
		if(x < y) return -1;
		if(x > y) return 1;
		return 0;
	})
	return sortedGrudges;
}

function sortDates(unsortedGrudges) {
	let sortedGrudges = unsortedGrudges.sort(function (a, b) {
		var x = a.date;
		var y = b.date;
		if(x < y) return -1;
		if(x > y) return 1;
		return 0;
	})
	return sortedGrudges;
}

function countUnforgivenGrudges(allGrudges) {
  let count = 0;
  for(let i=0; i<allGrudges.length; i++) {
    if (allGrudges[i].forgiven === false) {
			count++
		}
  }
	return count;
}

function countForgivenGrudges(allGrudges) {
  let count = 0;
  for(let i=0; i<allGrudges.length; i++) {
    if (allGrudges[i].forgiven === true) {
      count++;
    }
  }
	return count;
}
