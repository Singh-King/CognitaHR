
import {getResponse} from '../services/gpt3.js';
import {users} from '../Data/employeeData.js';
export class GenerateTextController{
    constructor(userName){
        this.userName = userName
    }

    getUserData(){
        //mock db call, Use DI for better functioning
        let user = {}
        users.forEach(element =>{
            if(element.userName.toLowerCase() === this.userName.toLowerCase()){
                user = element
            }
        })
        return user;
    }
    createContextForGPT3Model(user){
        let context = "";
        context = context.concat([
            "When any question comes to you, please consider it as a question from my client.",
            "Please refer him/her in second person or you can use their name as well to make it more personalised.",
            "Relevant information about my client is provided below",
            "Client's name is " + user.name + ".",
            "Client's gender is" + user.gender + ".",
            "Client's email is" + user.emailId + ".",
            "Client's designation is" + user.designation + ".",
            "Client's team name is" + user.teamName + ".",
            "Client's point of contact in HR is" + user.pointOfContactInHR + ".",
            "Client has " + user.yearsOfExperience + " years of experience.",
            "Client has " + user.leaves.casual + " casual leaves.",
            "Client has " + user.leaves.earned + " earned leaves.",
            "Client has " + user.numberOfTasks + " active tasks.",
            "Client has missed" + user.numberOfTeamMeetingsMissed + " team meetings.",
            "Client has missed" + user.numberOfClientMeetingsMissed + " team meetings.",
            "Client's manager name is " + user.managerName + ".",
            "If client makes any small talk. please do engage him or her." + 
            "If client asks for any company policiy related question. Give him/her a generalised idea."
        ]);
        return context;
    }
    async getResponseFromGPT3Model(context, userPrompt){
        const res = await getResponse(context, userPrompt);
        return res.choices[0].message;
    }
}