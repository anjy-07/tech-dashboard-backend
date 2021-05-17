var Board = require('../models/board');
var Pin = require('../models/pin');

module.exports = {
    Query: {
        boards: () => Board.find({}),
        pins: () => Pin.find({}),
        hello: () => 'Hello world!'
    },
    Mutation: {
        createBoard : (parent, args) => {
            const board = new Board({
                name: args.name,
                category: args.category,
                tags: args.tags,
                pins: args.pins,   
            })
            board.save();
            return board;
        },
        updateBoard : (parent, args) => {
            return Board.findOneAndUpdate(
                {
                  _id: args.boardId
                },
                {
                  $set: {
                    name: args.name,
                    category: args.category,
                    tags: args.tags,
                    pins: args.pins,
                  }
                }, {new: true}, (err, Board) => {
                  if (err) {
                    console.log('Something went wrong when updating the board');
                  } else {
                  }
                }
             );
        },
        addPinToBoard : (parent, args) => {
            const pin = new Pin({
                name: args.name,
                category: args.category,
                tags: args.tags
            })
            pin.save(function(err,pin) {
                let pinId = pin._id;
                return Board.findOneAndUpdate(
                    {
                      _id: args.boardId
                    },
                    {
                      $set: {
                        pins: pinId
                      }
                    }, {new: true}, (err, Board) => {
                      if (err) {
                        console.log('Something went wrong when updating the board');
                      } else {
                      }
                    }
                 );
            });         
        },
    }
};
