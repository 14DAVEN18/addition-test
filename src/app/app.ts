import { Component, inject, signal } from '@angular/core';
import { Pressable, SafeAreaProvider, SafeAreaView, Text, View, TextInput } from '@ng-native/components';
import { StatusBar } from '@ng-native/device';

/**
 * Element names are lowercase, and that is load-bearing rather than style: an uppercase name is
 * read as an unknown Angular component and commits as a plain view with nothing in it.
 */
@Component({
  imports: [Pressable, SafeAreaProvider, SafeAreaView, Text, View, TextInput],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly number1 = signal('')
  protected readonly number2 = signal('')
  protected readonly result = signal(0)

  protected readonly toastMessage = signal<string | null>(null)

  constructor() {
    inject(StatusBar).set({ style: 'auto' });
  }

  protected add() {
    const first = Number(this.number1())
    const second = Number(this.number2())

    if(!first || !second) {
      this.showToast('You must enter both numbers')
      return
    }

    this.result.set(first + second)
  }

  protected subtract() {
    const first = Number(this.number1())
    const second = Number(this.number2())

    if(!first || !second) {
      this.showToast('You must enter both numbers')
      return
    }

    this.result.set(first - second)
  }

  protected multiply() {
    const first = Number(this.number1())
    const second = Number(this.number2())

    if(!first || !second) {
      this.showToast('You must enter both numbers')
      return
    }

    this.result.set(first * second)
  }

  protected divide() {
    const firstValue = this.number1()
    const secondValue = this.number2()

    if(this.nullOrUndefined(firstValue) || this.nullOrUndefined(secondValue)) {
      this.showToast('You must enter both numbers')
      return
    }

    const first = Number(this.number1())
    const second = Number(this.number2())

    if(second === 0) {
      this.showToast('The second number must be different from 0')
      return
    }

    this.result.set(first / second)
  }

  protected showToast(message: string) {
    this.toastMessage.set(message)

    setTimeout(() => {
      this.toastMessage.set(null)
    }, 3000)
  }

  protected nullOrUndefined(number: string) {
    return number === null || number === undefined || number === ''
  }
}
