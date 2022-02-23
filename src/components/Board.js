import React, { Fragment, useEffect, useState } from 'react'
import choice from './utils/choice';
import Block from './Block';

export default function Board() {
    const [moves, setMoves] = useState(10)
    const [currentChoices, setCurrentChoices] = useState([])

    const initBoard = () => {
        const grid = [];
        const initBlock = (y, x) => ({
            color: choice(['yellow', 'red', 'green', 'blue']),
            y: y,
            x: x,
            isDead: false
        })

        for (let i = 0; i < 10; i++) {
            grid.push([]);
            for (let j = 0; j < 10; j++) {
                grid[i][j] = initBlock(i, j)
            }
        }


        return grid;
    }
    const [board, setBoard] = useState(initBoard());

    const onClickHandler = (node, e) => {

        //assign ux class so user can tell which blocks are selected
        e.target.className = 'selected'

        //if player has made choices previously
        if (currentChoices.length) {


            //if player is selecting a block that has not been chosen before
            if (!currentChoices.filter(v => v === node).length) {

                //if they match teh same color
                const colorMatched = currentChoices.filter(v => v.color === node.color).length
                console.log('colorMatched', colorMatched)
                if (colorMatched === currentChoices.length) {
                    setCurrentChoices(value => [node, ...value])
                }
                else if (currentChoices.length >= 2) {
                    //iterate through each one and move everything from top down and set top one to isDead: true

                    currentChoices.sort((a, b) => {

                        if (a.y > b.y) {
                            return 1
                        }
                        return -1
                    })

                    let boardCopy = board;
                    for (let i = 0; i < currentChoices.length; i++) {
                        let choiceX = currentChoices[i].x
                        let choiceY = currentChoices[i].y
                        //console.log('choiceX', choiceX)
                        while (choiceY >= 0 && !boardCopy[choiceY][choiceX].isDead) {
                            // console.log('board ting' , boardCopy[choiceY][choiceX])
                            if (choiceY - 1 >= 0) {
                                boardCopy[choiceY][choiceX].color = boardCopy[choiceY - 1][choiceX].color
                                boardCopy[choiceY][choiceX].isDead = boardCopy[choiceY - 1][choiceX].isDead
                                choiceY -= 1;
                            }
                            else {
                                boardCopy[choiceY][choiceX].color = 'white'
                                boardCopy[choiceY][choiceX].isDead = true
                            }

                            // console.log('after board ting' , boardCopy[choiceY][choiceX])
                            //currentChoices[i]

                            // console.log('tetsst')
                        }
                        console.log('new board', boardCopy)
                        //console.log('currentChoices[i].isDead',currentChoices[i].isDead)
                        // if(currentChoices[i-1].x >= 0 &&
                        //     !currentChoices[i-1].isDead ){

                        // }
                        // else{

                        // }
                        setBoard(boardCopy)
                        //console.log('i', currentChoices[i] )
                    }

                    let oldChoices = document.getElementsByClassName('selected')

                    while (oldChoices.length) {
                        oldChoices[0].classList.remove('selected')
                    }

                    setCurrentChoices([])
                    setMoves(moves - 1)
                } else {
                    let oldChoices = document.getElementsByClassName('selected')
                    while (oldChoices.length) {
                        oldChoices[0].classList.remove('selected')
                    }
                    setCurrentChoices([])
                }


            }
        }
        else {
            setCurrentChoices(value => [node, ...value])
        }
    }


    let renderBoardData = (board) => {
        return board.map(col => {
            return col.map(node => {

                return (
                    <Fragment>
                        <Block
                            key={`${node.x}${node.y}`}
                            blockData={node}
                            onClick={(e) => onClickHandler(node, e)}
                        />
                    </Fragment>
                )
            })
        })

    }
    console.log('here', board)
    return (
        <>
            <div
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                    textAlign: 'center',
                }}>
                <h1>Picto-laff</h1>
                <p>I am a board, there are many like me, but I am mine?</p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h3>Rules and Regulations</h3>
                <ol>
                    <li>If a player clicks a group of two or more blocks of the same color, the group of matching blocks should be removed.</li>
                    <li> Upon removal of the group of matching blocks, the space should be filled by the remaining blocks above shifting downward.</li>
                </ol>

                <p>Current moves left: {moves}</p>
            </div>
            {moves ?
                <>
                    <div style={{
                        height: '100%'
                    }}>
                        <div style={{
                            height: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(10, 5rem)',
                            gridTemplateRows: 'repeat(10, 5rem)',
                            placeContent: 'center',
                            gap: '1%',
                            margin: '0 auto',

                        }}>{board && renderBoardData(board)}</div>
                    </div>

                </> :
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '42px'
                }}>Game over!</div>}

        </>
    )
}