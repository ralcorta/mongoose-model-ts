# :rocket: Mongoose Model TS

mongoose-model-ts is a package for Typescript node proyect to use mongoose in a type way.

## Getting Started

Here is a basic example of how you can use the package:

### Prerequisites


* TypeScript 3.7+
* Node 8.10+
* mongoose ^5.9.2


### Installing

Download this package using npm

```
npm i --save mongoose-model-ts
```


## Gets started

### With JS mongoose:

```js
const  mongoose  =  require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { Editorial } = './editorial';
const { Enemy } = './enemy';

const  HeroSchema  =  new  Schema({
	name: { 
		type:  String 
	},
	superpower: { 
		type:  String, 
		required:  true 
	},
	editorial: { 
		type:  ObjectId, 
		ref: 'Editorial' 
	},
	enemies: [{ 
		type: ObjectId, 
		ref: 'Enemy' 
	}],
})

mongoose.model('Hero', HeroSchema);
```

### With TS mongoose:
```ts
import { prop, Model, entity } from  'mongoose-model-ts'
import { Editorial } from './editorial';
import { Enemy } from './enemy';

@entity
export  class  Hero  extends  Model {

	@prop()
	name:  string;

	@prop({ required:  true })
	superpower:  string;

	@prop({ ref: Editorial })
	editorial:  Editorial;

	@prop({ ref: Enemy })
	enemies:  Enemy[];

}
```
## How it works

Mongoose TS map the properties of the model and create a schema in the metadata of the class. All is transparent for the developer and they don't need get worry about how its work.

#### Create

```ts
	const hero = await Hero.create({name: 'Batman', superpower: 'Be cool' });
```

#### Find (One, many, byId)

```ts
	const query = { /* ... */ };
	
	const hero = await Hero.find(query);
	const hero = await Hero.findByUd(/*id*/);
	const hero = await Hero.findOne(query);
```

#### Save

We can use Save for create or update if the record exist in the database.
```ts
	// SAVE NEW RECORD
	const hero = new Hero;
	hero.name = 'Superman';
	hero.superpower = 'Too much to be fair';
	await hero.save();
	
	// UPDATE OLD RECORD
	const hero = await Hero.findByUd(/*id*/);
	hero.superpower = 'new super amazing power';
	hero.save();
```

#### Update

The same as Save() function when the record exist.
```ts
	// UPDATE OLD RECORD
	const hero = await Hero.findByUd(/*id*/);
	hero.name = 'Another craze and cool name';
	hero.update();
```

#### Autopopulation

The package allows you to access to a ref object directly without search, the package search and populate automaticly.
```ts
	const hero = await Hero.findByUd(/*id*/);
	
	// This automaticly find the editorial and save this into editorial property
	const editorial = hero.editorial.name;
	
```

## More

In this moment the package is un ultra mega archi prealpha. In the next weeks we will upload new cool features. Until that, we are hiring all types of recomendations to improve the package!
 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
