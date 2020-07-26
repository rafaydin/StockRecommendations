import React from 'react'
import Question from './question'

export default class Form extends React.Component{
    state = {
        questions: [
            {num: 1, question: 'Environmentally Friendly', value: 3},
            {num: 2, question: 'Community Outreach', value: 3},
            {num: 3, question: 'Charitable', value: 3},
            {num: 4, question: 'Promoting Diversity', value: 3},
        ],
        companies: []
    }

     // key-value pairs between slider value and message
     messages

  constructor(){
    super()
    this.messages = {
        1: 'Does Not Matter',
        2: 'Slightly Important',
        3: 'Important',
        4: 'Very Important',
        5: 'Crucial'
    }
}

    // changes value based on slider change
    handleChange = (num, e) => {
        const question = Object.assign({}, this.state.questions[num-1])
        question.value = Number(e.target.value)
        const questions = Object.assign([], this.state.questions)
        questions[num-1] = question
        this.setState({questions: questions})

    }

    handleSubmit = () =>{
        //populate companies

        let sum = 0
        this.state.questions.forEach(question => sum += question.value)

        return fetch('http://localhost:5000/companies/', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEnv: this.state.questions[0].value,
                userCom: this.state.questions[1].value,
                userChar: this.state.questions[2].value,
                userDiv: this.state.questions[3].value,
                sum: sum
            })
        })
            .then(response => response.json())
            .then(response =>{
                this.setState({companies: response})
            })

        .catch((error) => {
            console.error(error);
        });

    }

    render(){
        return(
            <div>
                {
                this.state.questions.map((question) =>{
                    return <Question 
                        value = {question.value} 
                        handleChange = {this.handleChange.bind(this, question.num)} 
                        num = {question.num}
                        message = {this.messages[question.value]}>
                        {question.question}
                        </Question>
                })
                }
                <button onClick = {this.handleSubmit}>Submit</button> <br/> <br/>
                {/* {
                this.state.companies.map((company) =>{
                    return <div>Name: {company.name} | Percentage Match: {company.match}%</div>
                })
                } */}
            </div>
        )
    }
    
}