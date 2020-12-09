import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(public firestore: AngularFirestore, public fireauth: AngularFireAuth) { 
    this.fireauth.onAuthStateChanged((user)=> {
      if(!user) this.fireauth.signInAnonymously();
    })
  }

  loginUser(user: any, callback: any) {
    this.firestore.collection('User', ref=> ref.where('email', '==', user.email))
    .get().subscribe(snap=> {
      if(snap.size) {
        const userData: any = snap.docs[0].data();
        const verify: any = bcrypt.compareSync(user.password, userData.password);
        if(verify) {
          this.storeUser({id: snap.docs[0].id});
          callback.confirmLogin({ status: 1 });
        }
        else {
          callback.confirmLogin({
            status: 0,
            fail: 'password'
          })
        }
      }
      else {
        callback.confirmLogin({
          status: 0,
          fail: 'email'
        })
      }
    })
  }

  signupUser(user: any, callback: any) {
    this.firestore.collection('User', ref=> ref.where('email', '==', user.email))
    .get().subscribe(snap=> {
      if(!snap.size) {
        const hash = bcrypt.hashSync(user.password, 10);
        this.firestore.collection('User').add({
          email: user.email,
          password: hash
        })
        .then(userDoc=> {
          this.storeUser({id: userDoc.id});
          callback.confirmSignup({status: 1});
        })
        .catch(err=> console.warn(err));
      }
      else {
        callback.confirmSignup({ status: 0 });
      }
    })
  }

  joinCode(code: any, callback: any) {
    const userId: any = this.getUser().id;
    this.firestore.collection('User').doc(userId)
    .get().subscribe(userDoc=> {
      if(userDoc.data()) {
        this.firestore.collection('Company')
        .get().subscribe(snap=> {
          let count = 0;
          snap.forEach(companyDoc=> {
            count++;
            const companyData: any = companyDoc.data();
            if(companyData.code.manager == code.value && companyData.name == code.name) {
              this.addEmployee({user: userId, company: companyDoc.id, role: 'manager'});
              callback.confirmCode({
                status: 0,
                fail: 'user'
              })
            }
            else if(companyData.code.employee == code.value && companyData.name == code.name){
              this.addEmployee({user: userId, company: companyDoc.id, role: 'employee'});
              callback.confirmCode({
                status: 0,
                fail: 'employee'
              })
            }
            else if(count == snap.size) {
              callback.confirmCode({
                status: 0,
                fail: 'code'
              })
            }
          })
          if(!snap.size) {
            callback.confirmCode({
              status: 0,
              fail: 'code'
            })
          }
        })
      }
      else {
        callback.confirmCode({
          status: 0,
          fail: 'user'
        })
      }
    })
  }

  addCompany(company: any, callback: any) {
    const newCodes = {
      employee: this.generateCode(),
      manager: this.generateCode(),
    }
    this.firestore.collection('Company').add({
      companyName: company.name,
      owner: {
        name: company.owner.name,
        phone: company.owner.phone
      },
      code: {
        manager: newCodes.manager,
        employee: newCodes.employee
      }
    }).then(companyDoc=> {
      this.addEmployee({
        user: this.getUser().id,
        role: 'Owner',
        company: {
          id: companyDoc.id,
          name: company.name
        },
        phone: company.owner.phone,
        name: company.owner.name
      });
      callback.confirmAddCompany({ status: 1, company: companyDoc.id });
    })
  }

  addEmployee(info: any) {
    this.firestore.collection('Company')
    .doc(info.company.id).collection('Employee')
    .add({ id: info.user, role: info.role, name: info.name, phone: info.phone }).then(employeeDoc=> {
      const userRef = this.firestore.collection('User').doc(info.user);
      userRef.get().subscribe(userDoc=> {
        const userData: any = userDoc.data();
        const curList = (!!userData.companies) ? userData.companies : [];
        curList.push({id: info.company.id, name: info.company.name});
        userRef.update({
          companies: curList
        })
      })
    })
  }

  storeUser(user: any) {
    const localData = (!!localStorage.getItem('com.simpleshifts.sty')) 
    ? JSON.parse(localStorage.getItem('com.simpleshifts.sty')) : {};
    localData.user = user;
    localStorage.setItem('com.simpleshifts.sty', JSON.stringify(localData));
  }

  getUser() {
    const localData = (!!localStorage.getItem('com.simpleshifts.sty')) 
    ? JSON.parse(localStorage.getItem('com.simpleshifts.sty')) : {};
    return localData.user || null;
  }

  getCompanyInfo(company: any, callback: any) {
    const userId = this.getUser().id;
    this.firestore.collection('User').doc(userId)
    .get().subscribe(userDoc=> {
      const userData: any = userDoc.data();
      if(!!userData) {
        if(userData.companies.find(c=> c.id == company)) {
          this.firestore.collection('Company').doc(company)
          .get().subscribe(companyDoc=> {
            const companyData: any = companyDoc.data();
            if(!!companyData) {
              callback.getCompanyData({
                status: 1,
                name: companyData.companyName
              })
            }
          })
        }
      }
    })
  }

  getCompanyList(callback: any) {
    const userID = this.getUser().id;
    this.firestore.collection('User').doc(userID)
    .get().subscribe(userDocRef=> {
      const userData: any = userDocRef.data();
      if(!!userData) {
        callback.confirmCompanyList({
          status: 1,
          companyList: userData.companies
        });
      }
    });
  }

  generateCode() {
    let code = ``;
    for(let i = 0; i < 4; i++) {
      code += `${Math.floor(Math.random() * 10)}`;
    }
    return code;
  }

  testFunction() {
    const userID = this.getUser().id;
    this.firestore.collection('Users').doc(userID)
    .get().subscribe(userDocRef=> {
      if(userDocRef.data()) {
        // do whatever
      }
      else {
        
      }
    })
  }

}
