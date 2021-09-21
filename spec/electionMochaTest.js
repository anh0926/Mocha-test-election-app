/* globals describe it xdescribe xit beforeEach expect election localStorage STORAGE_KEY */
var election
describe('Electorate Management', function(){
    // var election

    function getNames(allCandidates){
        const allNames = []
        for (const aCandidate of allCandidates){
            allNames.push(aCandidate.name)
        }
        return allNames
    }
// 1.	Create a whole that acts as a Facade for parts
    beforeEach(function(){
        election = new ElectorateManagement()
    })
    // FEATURE 2. Add a part
   // 15.	Get all parts 
    describe('adding candidate ', function () {                  
        describe('the added single Candidate is added ', function () {
            var theCandidate
            beforeEach ( function(){                
                election.addCandidateName('Anh Hoang')
                theCandidate = election.allCandidates[0]
            })
            describe('the id ', function () {
                it('should have an id of 1', function () {
                    expect(theCandidate.id).to.equal(1)
                  })
            })
            describe('the name', function () {
                it('should have the correct name', function () {
                    expect(theCandidate.name).to.equal('Anh Hoang')
                  })
            })
            describe('the vote ', function () {
                it('should be 0', function () {
                    expect(theCandidate.vote).to.equal(0)
                  })
            })
        })
        describe('the three Candidates are added ', function () {
            var election = new ElectorateManagement()
            election.addCandidateName('Anh Hoang')
            election.addCandidateName('Michael Lance')
            election.addCandidateName('Shayne')
            var candidate1 = election.allCandidates[0]
            var candidate2 = election.allCandidates[1]
            var candidate3 = election.allCandidates[2]

            describe ('the total Candidates', ()=>{
                it('should have 3 candidates', ()=>{
                    expect(election.allCandidates.length).to.equal(3)
                })
            })

            describe('the ids ', function () {
                it('should have an id of 1,2,and 3', function () {
                    expect([candidate1.id,candidate2.id, candidate3.id]).to.deep.equal([1,2,3])
                })
            })
            describe('the name', function () {
                it('should have the correct name', function () {
                    expect(candidate1.name).to.equal('Anh Hoang')
                    expect(candidate2.name).to.equal('Michael Lance')
                    expect (candidate3.name).to.equal('Shayne')
                })
            })
            describe('the vote ', function () {
                it('should be 0', function () {
                    expect(candidate1.vote).to.equal(0)
                    expect(candidate2.vote).to.equal(0)
                    expect(candidate3.vote).to.equal(0)
                })
            })
        })        
    })
    describe ('setting Candidate votes', function(){      
        election = new ElectorateManagement()      
        election.addCandidateName('Anh Hoang')
        candidate = election.allCandidates[0]
        election.setCandidateVote('Anh Hoang',20)

        describe('when vote is set to a certain Candidate', function(){
            describe ('the total vote', function(){
                it('should be 20 ', function(){
                    expect(candidate.vote).to.equal(20)
                })
            })
        })
    })
    // FEATURE 5. Delete a selected part
    describe ('delete a candidate', function(){
        let election = new ElectorateManagement()        
        election.addCandidateName('Anh Hoang')
        election.addCandidateName('Michael Lance')
        election.addCandidateName('Shayne')
        election.removeCandidate('Shayne')        

        it('should remove that candidate', function(){
            const expectedCandidateList = ['Anh Hoang','Michael Lance']
            const actualCandidateList = getNames(election.allCandidates)
            expect(actualCandidateList).to.deep.equal(expectedCandidateList)
        })
        it('should reduce the candidate count', function(){
            const expectedRemainingCount = 2
            const actualRemainingCount = election.allCandidates.length
            expect(actualRemainingCount).to.equal(expectedRemainingCount)
        })
    })
    // FEATURE 8. Update/edit a part
    describe('editing candidate name', ()=>{
        let election = new ElectorateManagement()
        election.addCandidateName('Anh')
        election.addCandidateName('Mike')
        election.addCandidateName('Shayne')      
        election.startEditing(election.allCandidates[0])
        election.allCandidates[0].name = 'Ann'
        //check if doneEditing works
        election.doneEditing(election.allCandidates[0])
        it ('should change the name of that candidate', ()=>{
            expect(election.allCandidates[0].name).to.equal('Ann')            
        })
    })
    describe('editing candidate vote', ()=>{
        let election = new ElectorateManagement()
        election.addCandidateName('Anh')
        election.addCandidateName('Mike')
        election.addCandidateName('Shayne')
        election.setCandidateVote('Anh', 20)
        election.setCandidateVote('Mike', 10)
        election.setCandidateVote('Shayne', 5)
        election.startEditing(election.allCandidates[0])
        election.allCandidates[0].vote = 18
        election.doneEditing(election.allCandidates[0])
        it ('should change the total votes of that candidate', ()=>{
            expect(election.allCandidates[0].vote).to.equal(18)
        })
    })
    // 9.	Discard /revert edits to a part (cancel editing )
    describe('discarding edits to a candidate',()=>{
        it ('should not change the name of that candidate', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('Anh')
            election.addCandidateName('Mike')
            election.addCandidateName('Shayne')
            election.startEditing(election.allCandidates[0])
            election.allCandidates[0].name = 'Ann'
            election.cancelEditing(election.allCandidates[0])
            expect(election.allCandidates[0].name).to.equal('Anh')                       
        })
        it ('should not change the vote of that candidate', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('Anh')
            election.addCandidateName('Mike')
            election.addCandidateName('Shayne')
            election.setCandidateVote('Anh', 20)
            election.setCandidateVote('Mike', 10)
            election.setCandidateVote('Shayne', 5)
            election.startEditing(election.allCandidates[0])
            election.allCandidates[0].vote = '18'
            election.cancelEditing(election.allCandidates[0])
            expect(election.allCandidates[0].vote).to.deep.equal(20)
        })
    } )
    // FEATURE 10. Validate inputs
    describe('validating inputs to a Cadidate', ()=> {
        it('should not allow empty names', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('Anh ')
            election.addCandidateName('')
            election.addCandidateName('Mike')
            const expectedCandidateList = ['Anh', 'Mike']
            const actualCandidateList = getNames(election.allCandidates)
            expect(actualCandidateList).to.deep.equal(expectedCandidateList)
        })
    })
    // FEATURE 3. Sort parts
    describe('sorting candidate by name', ()=>{
        it('candidate names should be sorted in alphabetic order', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('c')
            election.addCandidateName('b')
            election.sortCandidatesByName()
            const actualOrderNames = getNames(election.allCandidates)
            const expectedSortedNames = ['a', 'b', 'c']
            expect(actualOrderNames).to.deep.equal(expectedSortedNames)
        })
    })
    describe('sorting candidate by vote number', ()=>{
        it('candidate should be sorted in total-vote-count order', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('c')
            election.addCandidateName('b')
            election.setCandidateVote('a', 20)
            election.setCandidateVote('c', 10)
            election.setCandidateVote('b', 5)
            election.sortCandidatesByVote()
            const actualOrderNames = getNames(election.allCandidates)
            const expectedSortedVotes = ['b', 'c', 'a']
            expect(actualOrderNames).to.deep.equal(expectedSortedVotes)
        })
    })
     // 4.	Filter parts (get cadidate vote by id)
    // 12. A calculation across many part
    describe('filter candidates by Name', ()=>{
        it('should return the filtered candidates', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('c')
            election.addCandidateName('b')
            election.setCandidateVote('a', 20)
            election.setCandidateVote('c', 10)
            election.setCandidateVote('b', 5)            
            const candidates = election.getCandidateByNames('a')
            // const actualdNumber = candidates.length
            const actualId = candidates[0].id
            const actualName = candidates[0].name
            const actualVote = candidates[0].vote  
            const actualResult = [actualId, actualName, actualVote]
            const expectedFilterResult = [1,'a', 20]        
            expect(actualResult).to.deep.equal(expectedFilterResult)          
        })
        it('should return the many candidates with same name', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('b')
            election.addCandidateName('a') 
            election.addCandidateName('a')          
            const candidates = election.getCandidateByNames('a')
            // const actualdNumber = candidates.length
            const actualCount = candidates.length
            const expectedCount = 3   
            expect(actualCount).to.deep.equal(expectedCount)          
        })      
    })

    // 4.	Filter parts (get cadidate vote by id)
    // 12. A calculation across many part
    describe('filter candidates by 0 vote', ()=>{
        it('should return many candidates with 0 vote', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('c')
            election.addCandidateName('b')
            election.setCandidateVote('a', 0)
            election.setCandidateVote('c', 0)
            election.setCandidateVote('b', 20)            
            const candidates = election.get0VoteCandidates()
            const actualNumber = candidates.length       
            expect(actualNumber).to.deep.equal(2)
        })        
    })
    // 14.	Find a part given a search criterion
    describe('finding a candidate', function(){
        it('should return nothing with an empty candidate list', ()=>{            
            var election = new ElectorateManagement()
            const actualFoundCandidate = election.findCandidate('Anh')
            expect(actualFoundCandidate).to.equal(undefined)
        })
        it('should return find the only canditate with a unique name', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('c')
            election.addCandidateName('b')
            const actualFoundCandidate = election.findCandidate('a')
            expect (actualFoundCandidate).to.be.ok
            const expectedFoundName = 'a'
            const actualFoundName = actualFoundCandidate.name
            expect(expectedFoundName).to.equal(actualFoundName)
        })
        it('should return the first candidate with that name when there is more than one candidates having the same name', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('b')
            election.addCandidateName('c')
            election.addCandidateName('b')
            const actualFoundCandidate = election.findCandidate('b')
            // expect (actualFoundCandidate).to.equalDefined()
            expect (actualFoundCandidate).to.be.ok
            const expectedFoundName = 'b'
            const actualFoundName = actualFoundCandidate.name
            // expect(actualFoundName.length).to.deep.equal(2)????
            expect(actualFoundName).to.equal(expectedFoundName)
            const expectedFoundId = 2
            const actualFoundId = actualFoundCandidate.id
            expect(actualFoundId).to.equal(expectedFoundId)

        })
    })
    // 11.	A calculation within a part 
    describe('calculate percent votes', function(){
        it('should count the total votes of all canditates', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('a')
            election.addCandidateName('b')
            election.addCandidateName('c')
            election.setCandidateVote('a', 80)
            election.setCandidateVote('b', 10)
            election.setCandidateVote('c', 20) 
            let totalVote = election.getAllTotalVotes(election.allCandidates)
            expect(totalVote).to.equal(110)         
        })

        it('should count the percent vote of a certain canditate', ()=>{
            var election = new ElectorateManagement()
            election.addCandidateName('Anh')
            election.addCandidateName('b')
            election.addCandidateName('c')
            election.setCandidateVote('Anh',80)
            election.setCandidateVote('b',15)
            election.setCandidateVote('c',5) 
            let actualPercentVoteOfAnh = election.calcPercentVote('Anh')
            expect(actualPercentVoteOfAnh).to.deep.equal(80)         
        })
    })

     // 6.	Save all parts to LocalStorage
     describe('save', ()=>{
         it('should save a candidate in localstorage when it is ', ()=>{
             localStorage.clear()
             election = new ElectorateManagement()
             election.addCandidateName('Anh')
             election.save()
             var itemJSON = localStorage.getItem(STORAGE_KEY)
            //  expect(itemJSON).to.equalTruthy()
            expect(itemJSON).to.deep.equal
         })
         
         it('should have the correct JSON for the correct candidate in localstorage', ()=>{
            localStorage.clear()
            election = new ElectorateManagement()
            election.addCandidateName('Anh')
            election.setCandidateVote('Anh', 20)
            election.save()
            var itemJSON = localStorage.getItem(STORAGE_KEY)
            expect(itemJSON).to.equal('[{"id":1,"name":"Anh","vote":20,"percentVote":0}]')
         })
     })

     // FEATURE 7. Load all parts from LocalStorage
     describe('load', function(){
         it('should load a candidate from localStorage when it has a single candidate', function(){
            //save data
            localStorage.clear()
            election = new ElectorateManagement()
            election.addCandidateName('Anh')
            election.setCandidateVote('Anh', 20)
            election.save()
            //start the model again
            election = new ElectorateManagement()
            //load
            election.load()
            var itemJSON = localStorage.getItem(STORAGE_KEY)
            // expect(itemJSON).to.equalTruthy()
             expect(itemJSON).to.deep.equal           
         })
         
         it('should have the correct JSON for the loaded item', ()=>{
            //save data
            localStorage.clear()
            election = new ElectorateManagement()
            election.addCandidateName('Anh')
            election.setCandidateVote('Anh', 20)
            election.save()
            //start the model again to  check if save() and load() works
            election = new ElectorateManagement()
            //load
            election.load()
            var itemJSON = localStorage.getItem(STORAGE_KEY)
            expect(itemJSON).to.deep.equal('[{"id":1,"name":"Anh","vote":20,"percentVote":0}]')
         })
     })  



})  
