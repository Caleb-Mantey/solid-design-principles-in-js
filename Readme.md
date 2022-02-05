### SOLID Design Principles
One fundmental software principle is the __SOLID PRINCIPLE__ which is ussually refered to the as *the first five principles of object oriented design*. This principle was formulated by _Robert C. Martin_ (also known as **Uncle Bob**). In this article we will be using javascript to explain certain concepts. Javascript doesn't support features like interfaces and abstract classes but with the addition of typescript we can write javascript like we do in other languages like c# and java. So in this article we will be using typescript too.

Solid principles helps in reducing tight coupling between classes in our code. Tight coupling is when a group of classes highly depend on one another. Loose coupling is the opposite of tight coupling and this approach makes our code more reusable, readable, flexible, stable and maintainable. It is advisable to avoid tight coupling as much as possible and always make your code is loosely coupled.

**SOLID** stands for
- S - [Single Responsibility Principle](#srp)
- O - [Open-closed Principle](#ocp)
- L - [Liskov Substitution Principle](#lsp)
- I - [Interface Segregation Principle](#isp)
- D - [Dependency Inversion Principle](#dip)
  
Now lets break each of the principles down and get a better understanding of each of these principles.

#### Single Responsibility Principle<a name="srp"></a>
Single responsibility principle states that
> A class should have one and only one        responsibility. Which means your class should have only one job.

Consider this example
You have a mailer class that connects to an smtp service, takes an email processes and sends the email as either text or html. Now Lets see what this class does to get the job done.

```javascript
    class Mailer{
        constructor(mail){
            this.mail = mail
            this.smtpService = this.smtp_service_connection()
        }

        smtp_service_connection(){
            // Connects to smtp service
        }

        send(){
            this.smtpService.send(this.format_text_mail())
             this.smtpService.send(this.format_html_mail())
        }

        format_text_mail(){
            // formats to text version of mail
            this.mail = "Email For You \n" + this.mail;

            return this.mail;
        }

        format_html_mail(){
            // formats to html version of mail
             this.mail = `<html>
            <head><title>Email For You</title></head>
            <body>${this.mail}</body>
            </html>`;

            return this.mail;
        }
    }
```

This code does not follow the single responsibility principle  the mailer class is responsible for doing all the following
- Connects to an smtp service
- Format the mail in text format
- Format the mail in html format
- Sending the mail

This will make the `Mailer` class very difficult to maintain. Let's say for example we want to change the smtp provider we are using we will have to come into this class and do some changes to the `smtp_service_connection` method and this can get tricky and messy if the new provider does'nt implement a `send` method but a `deliver` method then we will have to also come and change this line ` this.smtpService.send(this.format_html_mail())` in our `send` method to ` this.smtpService.deliver(this.format_html_mail())`. All these is a result of the fact that our class is not performing only one functionality.


##### Better Approach
A more better approach is seen below where we divide all the task into seperate classes. We now have the following.
- A class that connects to the smtp service (TextFormatter)
- A class that formats our mail in text (MailerSmtpService)
- A class that formats our mail in html (HtmlFormatter)
- A class responsible for sending the mailer (Mailer)

You can see now the code looks better and our smtp service can be changed easily in only one class which does not affect the other parts of the mailing systems behaviour. If we use a new smtp service and it implements a `deliver` method instead of a `send` method then we only have to change one method (we change `this.smtp_con.send(mail)` to `this.smtp_con.deliver(mail)`) in the `MailerSmtpService` class. This will not affect other parts of our application and our app will still function properly. The Mailer class takes an instance of an smtp service and only sends a mail (__NOTE:__ `It is performing one and only one job to send mail`)

Also our `HtmlFormatter` and `TextFormatter` are doing just one thing formating the mail in the right format.

#### Mailer
```javascript
    class Mailer{
        constructor(mail, mailerFormats){
            this.mail = mail
            this.mailerFormats = mailerFormats
            this.smtpService = new MailerSmtpService()
        }

        send(){
            // Loops through mail formats and calls the send method
            this.mailerFormats.forEach((formater) => this.smtpService.send(formater.format(this.mail)))
        }
    }
```
#### MailerSmtpService
```javascript
    class MailerSmtpService{
        constructor(){
           this.smtp_con = this.smtp_service_connection()
        }

        send (mail){
            this.smtp_con.send(mail)
            // can easily change to be this if a service requires this implementation - smtp_con.deliver(mail)
        }

        smtp_service_connection(){
            // Connects to smtp service
        }
    }
```

#### HtmlFormatter
```javascript
    class HtmlFormatter{
        constructor(){
        }

        format(mail){
             // formats to html version of mail
              mail = `<html>
            <head><title>Email For You</title></head>
            <body>${mail}</body>
            </html>`;

            return mail;
        }
    }
```

#### TextFormatter
```javascript
    class TextFormatter{
        constructor(){
        }

        format(mail){
             // formats to text version of mail
             mail = "Email For You \n" + mail;

            return mail;
        }
    }
```

Now we can send an email by simply doing this 
```javascript
    const mailer = new Mailer("hello kwame", [new HtmlFormatter(), new TextFormatter()])
    mailer.send();
```

#### Open-closed Principle<a name="ocp"></a>
> This principle states that a class must be open for extension but close for modification.

This principle focus on the fact that the class must be easily extended without changing the contents of the class. If we follow this principle well we can actually change the behaviour of our class without ever touching any original piece of code. This also means if a Developer named Fred works on a certain feature and another Developer named Kwame wants to add some changes, then Kwame should be able to do that easily by extending on the features Fred has already provided.

Lets take an example from our `MailerSmtpService` class in the first example and lets make it support this principle.

#### MailerSmtpService - ( Initial )
This is our initial implementation for the `MailerSmtpService`. Nothing fancy here yet
```javascript
    class MailerSmtpService{
        constructor(){
           this.smtp_con = this.smtp_service_connection()
        }

        send (mail){
            this.smtp_con.send(mail)
            // can also be this.smtp_con.deliver(mail)
        }

        smtp_service_connection(){
            // Connects to smtp service
        }
    }
```

#### MailerSmtpService - ( Enhanced )
To support the open-closed principle we remove the `smtp_service_connection` method from our `MailerSmtpService` class and rather we pass the method through a constructor method, then in a subclass (`PostMarkSmtpService` and `SendGridSmtpService`) that inherits from `MailerSmtpService` we call the `constructor` method of the base class with `super(() => {})` and we pass a method which handles the smtp connection depending on smtp provider in use.

```javascript
    class MailerSmtpService{
        constructor(smtp_connection = () => {
            //connects to default smtp service
        }){
           this.smtp_con = smtp_connection()
        }

        send (mail){
            this.smtp_con.send(mail)
        }
    }
```


#### PostMarkSmtpService
```javascript
    class PostMarkSmtpService extends MailerSmtpService {
        constructor(){
           super(() => {
                // Connects to postmark smtp service
            })
        }

        send (mail){
            this.smtp_con.send(mail)
            // can also be this.smtp_con.deliver(mail)
        }
    }
```


#### SendGridSmtpService
```javascript
    class SendGridSmtpService extends MailerSmtpService {
        constructor(){
            super(() => {
                // Connects to sendgrid smtp service
            })
        }

        send (mail){
            this.smtp_con.send(mail)
            // can also be this.smtp_con.deliver(mail)
        }
    }
```


In our mailer class we can now create a new `PostMarkSmtpService` or `SendGridSmtpService` in our app and we can easily keep extending to support different smtp service.

```javascript
    class Mailer{
        constructor(mail, mailerFormats){
            this.mail = mail
            this.mailerFormats = mailerFormats
            this.smtpService = new PostMarkSmtpService()
            // OR this.smtpService = new SendGridSmtpService()

        }

        send(){
            // Loops through mail formats and calls the send method
            this.mailerFormats.forEach((formater) => this.smtpService.send(formater.format(this.mail)))
        }
    }
```

With this implementaion a developer can keep extending the `MailerSmtpService` to support more mailing service without modifying the existing logic in the `MailerSmtpService`.

#### Liskov Substitution principle<a name="lsp"></a>
This principle states that
> Derived or child classes must be substitutable for their base or parent classes. 

This means that a parent class should be easily substituted by the child classes without blowing up the application. This principle can be seen in the example above where we created a parent class called `MailerSmtpService` and we had two child classes called `PostMarkSmtpService` and `SendGridSmtpService`. You can observe that the child classes where used as substitute with the parent class with ease. 

For example:

```javascript
    mailerSmtp = new MailerSmtpService();
    postmarkMailerSmtp = new PostMarkSmtpService();
    sendgridMailerSmtp = new SendGridSmtpService();
```
 

 #### Interface Segregation Principle<a name="isp"></a>
This principle states that
> Do not force any client to implement an interface which is irrelevant to them.

This principle is similar to the `single responsibility principle` but applies to interfaces. It is usually referred too as the first principle of interfaces. Since javascript does not support interfaces we will implement it with typescript to get a better understanding. Lets take our first example where we had the `HtmlFormatter` and `TextFormatter` class which formats our email and do some few changes. 


#### IFormatter
```typescript
    export interface IFormatter {
        format(mail: string): string
        custom_styles(): string
    }
```
#### HtmlFormatter
```typescript
    class HtmlFormatter implements IFormatter {

       format(mail: string) {
            // sends html version of mail
            mail = `<html>
            <head>
            <title>Email For You</title>
            ${this.custom_styles()}
            </head>
            <body>${mail}</body>
            </html>`;

            return mail;
        }

        custom_styles(): string {
            return "<style>body{background-color: blue}</style>"
        }
    }
```

#### TextFormatter
```typescript
    class TextFormatter implements IFormatter {

        format(mail: string) {
            // sends text version of mail
            mail = "Text Version \n" + mail;

            return mail;
        }

        custom_styles(): string {
            return ""
        }
    }
```

Now with typescript we can see we have an interface to make sure we have the `format` and `custom_styles` methods been implemented in both our `TextFormatter` and `HtmlFormatter` class. If the `format` and `custom_styles` methods are not present in any class that implements this method our application will throw an error. 
But there is a problem here, because the `custom_styles` is only needed in the `HtmlFormatter` class to help in styling the html document. However since both the `TextFormatter` and `HtmlFormatter` class are using the same interface (`IFormatter`) they both have to implement the same methods(`custom_styles` and `format`) forcing as to write an empty `custom_styles` method for the `TextFormatter` class.

Now lets see a better approach:

#### IStyles
```typescript
    export interface IStyles {
        custom_styles(): string
    }   
```

#### IFormatter
```typescript
    export interface IFormatter {
        format(mail: string): string
    }
```

#### HtmlFormatter
```typescript
    class HtmlFormatter implements IFormatter, IStyles {

       format(mail: string) {
            // sends html version of mail
            mail = `<html>
            <head>
            <title>Email For You</title>
            ${this.custom_styles()}
            </head>
            <body>${mail}</body>
            </html>`;

            return mail;
        }

        custom_styles(): string {
            return "<style>body{background-color: blue}</style>"
        }
    }
```

#### TextFormatter
```typescript
    class TextFormatter implements IFormatter {

        format(mail: string) {
            // sends text version of mail
            mail = "Text Version \n" + mail;

            return mail;
        }
    }
```

Now you can see from the code refactor we have a new interface `IStyles` as well as our previous interface `IFormatter`. Also the `HtmlFormatter` class implements both the `IStyles` and `IFormatter` interface whiles the `TextFormatter` class implements only the `IFormatter` interface. This now makes our code cleaner and ensures the right methods are been implement in the classes that needs them. Now our `TextFormatter` class does not need to implement the `custom_styles` method since we have removed the `custom_styles` method from the `IFormatter` interface to a new interface (`IStyles`). This makes our code more maintainable and scalable. 
This is the `Interface Segregation Principle` at work. 

 #### Dependency Inversion Principle<a name="dip"></a>
This principle is divided into two parts and it states that
> - High-level modules/classes should not depend on low-level modules/classes. Both should depend on abstractions.
> - Abstractions should not depend on details. Details should depend on abstractions.

The above lines simply state that if a high level module or class will be dependent more on a low-level module or class then your code would have tight coupling and if you will try to make a change in one class it can break another class. It is always better to abstract the code to make classes loosely coupled as much as you can. This makes maintaining the code easy.

There’s a common misunderstanding that dependency inversion is simply another way to say dependency injection. However, the two are not the same.

In our previous example we created two new interfaces `IStyles` and `IFormatter` which where implemented in the `TextFormatter` and `HtmlFormatter` class. Now lets see how these classes can be used with abstraction in the example below:


#### Mailer
```typescript
class Mailer {
    _mail: string;
    _mailerFormats: Array<IFormatter>; // abstraction
    _smtpService: MailerSmtpService;


    constructor(mail: string, mailerFormats: Array<IFormatter>/*abstraction*/) {
        this._mail = mail;
        this._mailerFormats = mailerFormats;
        this._smtpService = new SendGridSmtpService();
    }

    send() {
        // Loops through mail formats and calls the send method
        this._mailerFormats.forEach((formater) =>
        this._smtpService.send(formater.format(this._mail))
        );
    }
}
```

Now lets look at the refactor of the `Mailer` class from our first example `(the first principle - Single responsibility principle)`. 
You can see we now have a `_mailerFormats` property which takes an array of `IFormatter` objects (`_mailerFormats: Array<IFormatter>;`). This means any class that implements the `IFormatter` interface can be stored in this array. 
Also our mailer class doesn't need to know about what formatter we are going to use, all it cares about is the formatter is implementing an `IFormatter` interface and it has a format method which we can call with ease. This will allow our `Mailer` class to be loosely coupled with our `HtmlFormatter` and `TextFormatter` class.