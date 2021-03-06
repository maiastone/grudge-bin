describe('Units', function() {

  const grudges = [
    {
      name: 'maia',
      id: 1,
      offense: 'stressed',
      date: 'Feb 27th 2017, 15:08',
      forgiven: true,
    },
    {
      name: 'jamie',
      id: 2,
      offense: 'late',
      date: 'Feb 24th 2017, 2:08',
      forgiven: false,
    },
  ]

  it('should sort names alphabetically', function() {
    let subject = sortNames(grudges);
    expect(subject[0].name).to.equal('jamie')
    expect(subject[1].name).to.equal('maia')
  });
  it('should sort dates chronologically', function() {
    let subject = sortDates(grudges);
    expect(subject[0].date).to.equal('Feb 24th 2017, 2:08')
    expect(subject[1].date).to.equal('Feb 27th 2017, 15:08')
  });
  it('should count Unforgiven grudges', function() {
    let subject = countUnforgivenGrudges(grudges);
    expect(subject).to.equal(1);
  })
  it('should count Forgiven grudges', function() {
    let subject = countForgivenGrudges(grudges);
    expect(subject).to.equal(1);
  })
})
