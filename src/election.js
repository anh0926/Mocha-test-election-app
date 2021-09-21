/* globals localStorage */
// FEATURE 13. Provide default values
const STORAGE_KEY = 'electorateManagement'

// FEATURE 2. Add a part
class Candidate {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.vote = 0;
        this.percentVote = 0;      
    }
    setVoteCount(totalVotes){        
        this.vote = totalVotes
    }    
    // setPercentVote(newPercentVote){
    //     this.percentVote = newPercentVote
    // }
}
// 1.	Create a whole that acts as a Facade for parts
class ElectorateManagement {
    constructor(){
        this.allCandidates = [];
        this.allTotalVotes = 0;
        this.beforeEditCandidateName = '';
        this.beforeEditCandidateVote = 0;
        this.editedCandidateName = null;
        this.editedCandidateVote = null;
        this.name = 'Ilam'// 13.	Provide default values        
    }
    // 15.	Get all parts 
    getAllCandidates(){
        return this.allCandidates
    } 

    getAllTotalVotes(){
        return this.allTotalVotes
    }
    // FEATURE 2. Add a part
    addCandidateName(newName){
        var addedName = newName.trim()
        if (!addedName) {
            return 
        }
        const newId = this.allCandidates.length + 1
        const aNewCandidate = new Candidate (newId, addedName)
        this.allCandidates.push(aNewCandidate)       
    }

    setCandidateVote(name,totalVotes){
        var aCandidate = this.findCandidate(name);
        // console.log(`[Candidate info]: ${JSON.stringify(candidateInfo)}`);
        const candidate = new Candidate(aCandidate.id, aCandidate.name);
        candidate.setVoteCount(totalVotes);   
        // console.log(`Candidate class instance values: ${JSON.stringify(candidate)}`)
        aCandidate.vote = candidate.vote;         
        this.allTotalVotes += candidate.vote; 
        // console.log(`[anh hoang info]: ${JSON.stringify(findCandidate('Anh Hoang'))}`) 
    }

        // 14.	Find a part given a search  (find a candidate by name)
    findCandidate (targetName){
            let result = this.allCandidates.find(aName => aName.name === targetName)
            return result
    } 
       
    // 11.	A calculation within a part
    calcPercentVote (name) {
        console.log(`Calculating the percent vote for: ${name}`);
        let candidate = this.findCandidate(name)
        let allTotalVotes = this.allTotalVotes
        let percentVote = (candidate.vote * 100)/allTotalVotes
        return percentVote 
        // candidate.setPercentVote(percentVote)
    }
        
        // 5.	Delete a selected part (delete invalid Candidate)
    removeCandidate(targetCandidateName){
        let candidate = this.findCandidate(targetCandidateName) 
        this.allCandidates.splice(candidate.id-1,1)
    }
    // 8.	Update/edit a part (update/edit candidate name/vote)
    startEditing (candidate){        
        this.beforeEditCandidateName = candidate.name;
        this.beforeEditCandidateVote= candidate.vote;
        this.editedCandidate = candidate
    }
    doneEditing (candidate){
        // this.cancelEditing()
        // 10.	Validate inputs   
        if (!candidate){
            return
        }   
        this.editedCandidate = null 
        candidate.name = candidate.name.trim()
        if (!candidate.name){
            this.removeCandidate(candidate)
        }
    }
    // 9.	Discard /revert edits to a part (cancel editing )
    cancelEditing(candidate){
        this.editedCandidate = null
        candidate.name = this.beforeEditCandidateName
        candidate.vote = this.beforeEditCandidateVote
    }

    // 3.	Sort parts (sort candidate by name)
    sortCandidatesByName(){
        this.allCandidates.sort(function(a,b){
            if (a.name < b.name){
                return -1
            }
            if (a.name > b.name){
                return 1
            }
            return 0;
        })
    }
    sortCandidatesByVote(){
        this.allCandidates.sort(function(a,b){
            if (a.vote < b.vote){
                return -1
            }
            if (a.vote > b.vote){
                return 1
            }
            return 0;
        })
    }
    
    // 12. A calculation across many part
    getCandidateByNames(name){
        return this.allCandidates.filter(aCandidate=>aCandidate.name === name)
    }
    // 4.	Filter parts 
    // 12. A calculation across many part
    get0VoteCandidates(){
        return this.allCandidates.filter(aCandidate=>aCandidate.vote === 0)
    }

    // 7.	Load all parts from LocalStorage
    save (){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allCandidates))
    }

    // 6.	Save all parts to LocalStorage
    load (){
        return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')
    }


    
    
    
}

// var a = new ElectorateManagement();
// a.addCandidate('Anh');
// a.addCandidate('Jorge');
// a.findCandidate('Anh');
// console.log('all candidate:', a.allCandidates)
    
// var b = new Candidate()