/*
|-------------------Javascript简略教程-------------------|
|备注：对电脑编程有经验的小伙伴可以试下举一反三，自己尝试运用以下  |
|      语法到真实Problem Solving中（比如CSE各topic）。      |
|_______________________________________________________|

Made by Shang
*/

// 变量申明的三种方法
// *声明Javascript的变量是不需要分int, double, string...的

var myName = 'Player'; // 通用变量，相当于C里面的auto，无局部Scope限制
let yourName = 'Unknown\'s'; // 同上，有局部Scope限制
const HERNAME = 'Battleground' // 常量，定义后无法更改其数值

// 输出到控制台 （在index页面右键-Inspect-Console 打开控制台）
console.log(myName + ' ' + yourName + ' ' + HERNAME);

// 声明无参数的函数
function funcName() {
    // do something
    
    //如果不写return就默认为 void，return的内容可以是任何东西，没有类型限制。
    return true;
}

// 有参数的函数
function funcName2(var1, var2) {
    // do something
    
    //这里我没有写return，所以这个函数是void
}

//计次循环
for (var i = 0; i < 10; i++) {
    // do something
}

// 条件循环
while (true) {
    //do something
    break;
}

// 数组 (基本数组使用方法没有覆盖)
var arr = [1, 2, 3];
var arr2 = new Array(1, 2, 3); 
var copy2Me = [];
arr.push(4); // 加4到最后
arr.pop(); // 移除最后一个成员（4）
arr2.unshift(0); // 加 0 到前面
arr2.shift(); // 移除第一个成员（0）

copy2Me = Array.prototype.slice.call(arr2); // <=== 复制arr2到copy2Me

console.log(arr2); //一样的
console.log(copy2Me);


// Map, Set
var map = new Map();
var set = new Set();
map.set('Question', 'What is your PUBG K/D ratio?');
set.add('Only Appear Once.');
set.add('Only Appear Once.');



//基本语法跟Java差不多。。。不废话了

//难一点的内容
// var, let, const的差别
// 解释：let和const就Scope而言是一样的，var是全局的。这跟Hoisting有关，有兴趣的自己看下。
function debug() {
    var x = 1; // <== var
    if (true) {
        var x = 2;
        console.log(x); // <== print 2
    }
    console.log(x); // <== print 2
}
debug(); // <=== 两次print出来的信息都是2！因为2是最后一一次被定义的

function debug2() {
    let x = 1; // <== let
    if (true) {
        let x = 2;
        console.log(x); // <== print 2
    }
    console.log(x); // <== print 1
}
debug2();

function debug3() {
    const x = 1; // <== const
    if (true) {
        const x = 2;
        console.log(x); // <== print 2
    }
    console.log(x); // <== print 1
}
debug3();

// 返回函数指针
var jobQ = getQuestion('Teacher');
var jobQ2 = getQuestion('Designer');
jobQ();
jobQ2();
function getQuestion(job) {
    if (job === 'Teacher') {
        return function() {
          console.log("Do you enjoy teaching kids under the age of 5?");  
        };
    } else if (job === 'Designer') {
        return function() {
            console.log("What is your definition of UX?");
        }
    } else {
        return function() {
            console.log("Gun.");
        }
    }
}

// Closure
// 解释：getFunc()返回的是一条匿名函数的指针，这条函数返回的是accessMe的数值。
//      因为我们把这条函数指针储存在一个叫accessFunc的变量里，所以getFunc()里面
//      的accessMe变量不会在getFunc()运行完后销毁，所以如果我们call accessFunc()
//      返回的会是accessMe的内容，true。

function getFunc() {
    var accessMe = true;
    return function() {
        return accessMe;
    }
}

var accessFunc = getFunc();
accessFunc();

// 声明对象

//创建一个名为SBCMember的Object
SBCMember = function(name, major, sex, pubg){
    this.name = name;
    this.major = major;
    this.sex = sex;
    this.pubg = pubg;
    
    this.displayInfo = function() {
        console.log(`SBC Member: ${this.name} majors in ${this.major} and ${this.pubg === true ? 'plays PUBG!' : 'does not play PUBG.'}`);
    }
}

var lyc = new SBCMember("刘导", "math", 1, true);
console.log(lyc); // <--- SBCMember {name: "刘导", major: "math", sex: 1, pubg: false}

//只在乎他玩不玩Pubg?
console.log(lyc.pubg); // <--- false
lyc.displayInfo(); // 呼叫对象的函数

// 继承 (Inheritance)

var Car = function(model = 'RAV4', color = 'dodgerblue'){
    this.model = model;
    this.color = color;
}
    
Car.prototype.seats = 5;
Car.prototype.price = 19000;
Car.prototype.drive = function(self) {
    console.log("--------You are driving " + 'with ' + this.seats + ' people.');
}

var honda = new Car("Honda", "black");
honda.seats = 10;
honda.price = 0;
Car.prototype.drive(Car);


//IIFE AKA: 立刻激活的匿名函数 = 模块化编程
//解释： 因为Scope的原因，一段block里的变量是无法被外部所访问，这相当于Java的Private

var main = (function(param){
    //这个Block里面的数据外面是无法访问的！
    var money = 100;
    // money只有main这个Module能访问&修改
    
    //如果想要创建与其他Module的接口
    return {
        // return 一个Object，其中包含你想要公开的内容
        //以下函数为Public
        printMoney: function() {
            console.log(money);    
        },
        
        getMoney: function() {
            return money;
        },
        
        stealMoney: function(amount) {
            alert("Don't try to hack my bank account!");
        }
    };
})("参数 goes here");

let cash = main.getMoney(); // cash = 100
if (cash >= 100) {
    main.stealMoney(1000000); // 一个网页对话框会弹出来叫你不要偷钱
}
//如果我想直接改main里面的money...
main.moeny = 0; // <=== 没效果 + 错误
main.printMoney(); // <=== 这里可以看到money还是100，没被修改

// Object Dissection
var data = {
    kills: 5,
    death: 10
};

const {kills, death} = data;
const kd = kills / death;
console.log("Your K/D ratio is " + kd);

// array foreach
var arr = [1, 2, 3, 4, 5];
arr.forEach(function(cur) {
    console.log("The current number is " + cur);
});

// 上面这个跟下面这个是一样的效果
//arr.forEach(el => console.log("The current number is " + el));

// 更多数组操作：Map
//例子：把不是偶数的数组成员变为-1
var oldArr = [1, 3, 5, 7, 2, 9, 8, 0, 12];
var newArr = oldArr.map(function(cur) {
   if (cur % 2 === 0) {
       return cur;
   } else {
       return -1;
   }
});

console.log(newArr);

// 函数操作：Bind, Call, Apply

//测试Obj
var obj = {
    name: '不是刘导',
    callMe: function() {
        console.log(this.name + ' ' + ' called me.');
    }
};

obj.callMe(); // <=== 出现：‘不是刘导 called me'
function example(yearOfBirth) {
    let age = 2018 - yearOfBirth;
    console.log(this.name + ' ' + 'is now ' + age + ' years old.');
}

// 无限个参数，存为数组
function example_evoled(...manyParam) {
    console.log(this.name + "! Why would you enter " + manyParam.length + " parameters?");
}

// Bind可以手动设置函数的 this 指针，以下例子把函数的this指针定义为lyc的对象。
var bind = example.bind(lyc);
bind(1993);

// 跟Bind差不多，唯一差别是不需要手动再call一次指针
var call = obj.callMe.call(lyc); // <=== 出现：’刘导 called me'

const paramArray = [true, false, 'ok', 2, 4.0];
var apply = example_evoled.apply(lyc, paramArray); // 《== 提交一堆参数

// 枚举
var food = {
    meat: {
        beef: 'Beef',
        pork: 'Pork'
    },
    veg: {
        lettuce: 'Lettuce',
        cucumber: 'Cucumber'
    }
};

//访问枚举的方法
console.log(food.meat.beef);
console.log(food.veg['lettuce']);


// Blocks
// 括号外无法访问括号内的内容，跟IIFE差不多
{
    const cash = 1000;
    let food = 1;
}

// 类
class Person {
    constructor (name, yearOfBirth, sex, age) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.sex = sex;
        this.age = age;
    }
    
    aFunction() {
        console.log(this.name);
    }
}

const miska = new Person('miska', 1998, 'm', 19);
console.log(miska);

// ES6 类继承
class Programmer extends Person {
    constructor(name, yOb, sex, age, skill) {
        super(name, yOb, sex, age);
        this.skill = skill;
    }
    
    // static function can only be called via Class, not instance of class
    static explain() {
        console.log("Programming is good.");
    }
}


const john = new Programmer('Siga', 1992, 'fm', -1, 'none');
console.log(john);

Programmer.explain();

// 暂时到这里为止，下次再发DOM操作教程。










