/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/polls              ->  index
 * POST    /api/polls              ->  create
 * GET     /api/polls/:id          ->  show
 * PUT     /api/polls/:id          ->  upsert
 * PATCH   /api/polls/:id          ->  patch
 * DELETE  /api/polls/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Poll from './poll.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Polls
export function index(req, res) {
  return Poll.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Poll from the DB
export function show(req, res) {
  return Poll.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Poll in the DB
export function create(req, res) {
  return Poll.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Poll in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }


  return Poll.findOneAndUpdate(
    {_id: req.params.id}, 
    req.body, 
    {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function vote(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  // this code gets address
  console.log(req.connection.remoteAddress);
  console.log(req.body.voters);

  if (req.body.voters.includes(req.connection.remoteAddress)) {
    console.log("already voted");
    // chonge
    
    res.status(404);
    res.end();
    return;

  } else {
    req.body.voters.push(req.connection.remoteAddress);
    console.log(req.body.voters);
    
    return Poll.findOneAndUpdate(
      {_id: req.params.id}, 
      req.body, 
      {
        new: true, 
        upsert: true, 
        setDefaultsOnInsert: true, 
        runValidators: true})
      
      .exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  } 

  // TODO: check if address is in the voter list for this poll
  // if it is, don't update

}

// Updates an existing Poll in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Poll.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Poll from the DB
export function destroy(req, res) {
  return Poll.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
