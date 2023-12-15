import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/service/layout.service';
import { LayoutCandidateService } from 'src/app/service/layout-candidate.service';
import { TestService } from 'src/app/service/test.service';
import { Observable, Subject, Subscription, startWith, takeUntil } from 'rxjs';
import { VoteEditComponent } from '../vote-edit/vote-edit.component';

@Component({
  selector: 'app-voting',  
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements  AfterViewInit{
  valueSelected: string = '';
  voted: boolean = false;
  newCandidate: string = '';
  participants: string[] = ['Marcelo', 'Andréia', 'Alexandre'];
  title: string = 'Selecione sua escolha :';
  newTitle: string = '';
  titleSearch: string = '';
  receivedData: string = '';
  private unsubscribe = new Subject<void>();  
  @ViewChild(VoteEditComponent, { static: false }) voteEditComponent!: VoteEditComponent;  
  
  valorInicial: number = 0; 
  valorAtual: string = '';
  novoValor: number = 0;

  testEdit:string = "VOTING - testEdit";

  

  constructor(private layoutService: LayoutService, 
             private layoutCandidate: LayoutCandidateService,
             private testService: TestService) {
    this.valorInicial = this.layoutService.getNovoValor();
    this.testEdit = this.testService.getTestValue();  

  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  onMudouValor(evento: { novoValor: number; }){
    this.valorInicial = evento.novoValor;
    this.layoutService.setNovoValor(this.valorInicial);
    console.log(evento.novoValor);
  }  

  updateParticipants(candidate: string) {
    console.log('Participante removido:', candidate);
    this.participants = this.participants.filter(participant => participant !== candidate);
    console.log('Lista de participantes atualizada:', this.participants);
  }  

  
  ngAfterViewInit() {
    setTimeout(() => {  

      if(this.voteEditComponent){
        this.testEdit = this.voteEditComponent.testEdit;
      }

      if (this.voteEditComponent) {
        this.valorInicial = this.voteEditComponent.valor;        
      } 

      
    });
  }
  

  sendVote() {
    this.voted = true;
    setTimeout(() => {
      this.voted = false;
    }, 3000);
  }

  selectCandidate(candidate: string) {
    this.valueSelected = candidate;
  }




}

