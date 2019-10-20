const graphql = require('graphql'); // graphql package
const _= require('lodash');
const FlightLeg = require('../models/flightleg.js');
const AircraftLine = require('../models/aircraftline.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const FlightLegType = new GraphQLObjectType({
  name: 'FlightLeg',
  fields:() => ({
    id : {type: GraphQLID},
    flightNumber: {type: GraphQLInt},
    scheduleDate: {type: GraphQLInt},
    flightSuffix: {type: GraphQLString},
    assignedTailNumber: {type: GraphQLString},
    flightLegType: {type: GraphQLString},
    aircraftline:{
      type: AircraftLineType,
      resolve(parent, args){
        console.log(parent);
        return AircraftLine.findById(parent.aircraftlineId);
      }

    }
  })
});

const AircraftLineType = new GraphQLObjectType({
  name: 'AircraftLine',
  fields:() => ({
    id: {type: GraphQLID},
    aircraftline: {type: GraphQLInt},
    acLineDate: {type: GraphQLInt},
    assignedTailNumber: {type: GraphQLString},
    version: {type: GraphQLInt},
    flightlegs:{
      type: new GraphQLList(FlightLegType),
      resolve(parent , args){
        console.log(parent);
        return FlightLeg.find({aircraftlineId : parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType ({
  name:'RootQueryType',
  fields:{
      flightleg: {
        type:FlightLegType,
        args:{id: {type: GraphQLID}},
        resolve(parent , args){
          return FlightLeg.findById(args.id);
        }
      },
      aircraftline: {
        type:AircraftLineType,
        args:{id: {type: GraphQLID}},
        resolve(parent , args){
          return AircraftLine.findById(args.id);
        }
      },
      flightlegs:{
        type: new GraphQLList(FlightLegType),
        resolve(parent, args){
          //return books;
          return FlightLeg.find({});
        }
      },
      aircraftlines:{
        type: new GraphQLList(AircraftLineType),
        resolve(parent, args){
          //return authors;
          return AircraftLine.find({});
        }
      }
  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addAircraftLine:{
      type: AircraftLineType,
      args:{
        aircraftline: {type: new GraphQLNonNull(GraphQLInt)},
        acLineDate: {type: new GraphQLNonNull(GraphQLInt)},
        assignedTailNumber: {type: GraphQLString},
        version: {type: GraphQLInt},
      },
      resolve(parent,args){
        let aircraftline = new AircraftLine({
          aircraftline:args.aircraftline,
          acLineDate:args.acLineDate,
          assignedTailNumber:args.assignedTailNumber,
          version:args.version
        });
        return aircraftline.save();
      }
    },


  addFlightLeg:{
    type: FlightLegType,
    args:{
      flightNumber: {type: new GraphQLNonNull(GraphQLInt)},
      scheduleDate: {type: new GraphQLNonNull(GraphQLInt)},
      flightSuffix: {type: GraphQLString},
      assignedTailNumber: {type: GraphQLString},
      flightLegType: {type: GraphQLString},
      aircraftlineId: {type:new GraphQLNonNull(GraphQLID)}
    },
    resolve(parent,args){
      let flightleg = new FlightLeg({
        flightNumber:args.flightNumber,
        scheduleDate:args.scheduleDate,
        flightSuffix:args.flightSuffix,
        assignedTailNumber:args.assignedTailNumber,
        flightLegType:args.flightLegType,
        aircraftlineId: args.aircraftlineId
      });
      return flightleg.save();
    }
  }
}
})

module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation: Mutation
});
