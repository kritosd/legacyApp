const Relativeness = {
    Hausband: '1',
    Parent: '2',
    Child: '3',
    Brother: '4'
};

const persons = [];

class Person {
    constructor(id, name, relatives, percent, onLife) {
        this.id = id;
        this.name = name;
        this.relatives = relatives;
        this.percent = percent;
        this.onLife = onLife;
    }

    getPersonById(id) {
        return persons.find(p => p.id == id);
    }

    hasHausband() {
        return this.relatives.filter(r => r.relativeness == Relativeness.Hausband).length > 0;
    }

    getHausband() {
        return this.relatives.filter(r => r.relativeness == Relativeness.Hausband).map(rel => this.getPersonById(rel.id))[0];
    }

    hasChilds() {
        return this.getChilds().length > 0;
    }

    getChilds() {
        return this.relatives.filter(r => r.relativeness == Relativeness.Child).map(rel => this.getPersonById(rel.id)).filter(item => item);
    }

    hasBrothers() {
        return this.getBrothers().length > 0;
    }

    getBrothers() {
        return this.relatives.filter(r => r.relativeness == Relativeness.Brother).map(rel => this.getPersonById(rel.id)).filter(item => item);
    }

    hasParents() {
        return this.getParents().length > 0;
    }

    getParents() {
        return this.relatives.filter(r => r.relativeness == Relativeness.Parent).map(rel => this.getPersonById(rel.id)).filter(item => item);
    }

    hasRelatives() {
        return this.relatives.length > 0;
    }

    isAlive() {
        return this.onLife;
    }

    setLegacy(percent) {
        if (this.isAlive()) {
            this.percent = percent;
        } else {
            this.percent = 0;
            this.shareLegacy(percent);
        }
    }

    shareLegacy(percent) {
        if (this.hasRelatives()) {
            if (this.hasHausband()) {
                if (this.hasChilds()) {
                    this.getHausband().setLegacy(percent/4);
                    const leftOver = percent*3/4;
                    this.getChilds().forEach(child => child.setLegacy(leftOver/this.getChilds().length));
                } else {
                    this.getHausband().setLegacy(percent/2);
                    const leftOver = percent/2;
                    this.getParents().forEach(parent => parent.setLegacy(leftOver/this.getParents().length));
                }
            } else if (this.hasChilds()) {
                this.getChilds().forEach(child => child.setLegacy(percent/this.getChilds().length));
            } else if (this.hasBrothers()) {
                this.getBrothers().forEach(parent => parent.setLegacy(percent/this.getBrothers().length));
            } else if (this.hasParents()) {
                this.getParents().forEach(parent => parent.setLegacy(percent/this.getParents().length));
            }
        }
    }
}


var Legacy = 1;

var levels = [];

levels.push({name: 0, persons:[]});
levels.push({name: 1, persons:[]});
levels.push({name: 2, persons:[]});
levels.push({name: 3, persons:[]});


persons.push(new Person(0, 'Dead', [
    {id:1, relativeness: Relativeness.Hausband},
    {id:2, relativeness: Relativeness.Child},
    {id:3, relativeness: Relativeness.Child},
    {id:7, relativeness: Relativeness.Child},
    {id:5, relativeness: Relativeness.Parent},
    {id:6, relativeness: Relativeness.Parent}], 1, false));

persons.push(new Person(1, 'wife', [{id:0, relativeness: Relativeness.Hausband}], 0, true));

persons.push(new Person(2, 'Child 1', [
    {id:0, relativeness: Relativeness.Parent},
    {id:3, relativeness: Relativeness.Brother},
    {id:7, relativeness: Relativeness.Brother}], 0, true));

persons.push(new Person(3, 'Child 2', [
    {id:0, relativeness: Relativeness.Parent},
    {id:2, relativeness: Relativeness.Brother},
    {id:7, relativeness: Relativeness.Brother}], 0, true));

persons.push(new Person(7, 'Child 3', [
    {id:8, relativeness: Relativeness.Hausband},
    {id:9, relativeness: Relativeness.Child},
    {id:0, relativeness: Relativeness.Parent},
    {id:2, relativeness: Relativeness.Brother},
    {id:3, relativeness: Relativeness.Brother}], 0, false));


persons.push(new Person(8, 'wife', [
    {id:1, relativeness: Relativeness.Hausband},{id:7, relativeness: Relativeness.Hausband}], 0, true));

persons.push(new Person(9, 'Child  Child 1', [
    {id:7, relativeness: Relativeness.Parent}], 0, true));

// persons.push(new Person(4, 'Child Child 1', [{id:2, relativeness: Relativeness.Parent}], 0, true));

persons.push(new Person(5, 'Parent 1', [
    {id:0, relativeness: Relativeness.Child}], 0, true));

persons.push(new Person(6, 'Parent 2', [
    {id:0, relativeness: Relativeness.Child}], 0, true));

// calculate(1);
const final = persons[0].setLegacy(1)

console.log(persons);



// function shareLegacy(percent) {

//     levels.forEach(level => {

//         level.persons.forEach(person => {
//             if (!person.isAlive()) {
//                 if (person.hasRelatives()) {
//                     const hausband = person.hasHausband();
//                     if (hausband) {
//                         hausband.setLegacy(percent/4);
//                     } else if (person.hasChilds()) {
//                         childs = person.hasChilds();
//                         childs.forEach(child => child.setLegacy(percent/child.length));
//                     } else {

//                     }
//                 }
//             }
//         });
//     });
// }
