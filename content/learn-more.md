+++
draft = false
type = 'prose'
+++

<div class="lg:max-w-7xl lg:mx-auto my-6 lg:my-10 px-4 lg:px-8 w-full">
	<h1 class="text-4xl font-bold mb-6">Features</h1>
	<iframe src="https://www.youtube.com/embed/3UQ099i5gHw?autoplay=1" allowfullscreen allow='autoplay'></iframe>
</div>

## Round Structure

To win the game, a player must claim victory in 3 rounds. Each round has two distinct phases: the Preparation Phase and the Battle Phase.

### **Deploy phase**

**Round Start:** Both players gain Gold, fill their hands and the game announces the current round and the scores of both players.

Then both player place Units and/or Artifacts on the board. The action is synchronous. This phase takes 25s

### **Battle Phase**

**GO!:** Battle starts locking all units location and upgrades.

**Battle:** Choices the player made during Deploy Phase will be revealed to the enemy. This phase takes 30s units will fight until theres 1 team left.

**Overtime:** If the battle phase takes longer than 30s, the player will enter the Overtime. The speed of the game will be doubled and all Crowd Control effects and healing will be halved. This phase takes 10s

**Tie Breaker:** If the Overtime did not resolve the round, all units will get immunity to all sources of Damage/Healing, be permanently stunned and will not be able to endure any kind of status effect, all units lose 1 HP every 0.02s Until one player runs out of units and the other player claims victory for that round.

**Round End:** Both players can see who won the round and the remaining units on the board do a small winning animation before starting a new round. the player that has no units left will loose a heart and lose a round.

At the beginning of each new round, the Deploy Phase starts again, but previously executed moves remain permanently set on the board, players are able to see their opponent’s last round Deploy phase placements/upgrades.

## Board

The board is a 2D plane where the action takes place, composed of a 7x10 grid of tiles. Players can position their units only on the nearest 7x5 section of the board.

## Gold

Gold is a currency player uses to place units. At the start of the round player gets 7 Gold, and +2 Gold if previous round was lost.

## Deck

Deck is a collection of 8 units player chose before the battle.
### Openers

Starter Slots are 2 slots with units in which will result in these units being automatically placed during the first round. The cost of Opener Units will be deprived from starter Gold at the start of the round. Player can’t select starter units for which sum of their cost is greater than starter gold. *(a + b ≤ 7)*

## Backpack

Backpack is a collection of 24 *(8x3)* Unit copies and 2 *(unique)* Artifacts.

### Hand

Hand contains 4 Units copies player can see and use. If player uses one of the copies the slots becomes empty, but it will get replaced by the next unit in a pool when next rounds starts. Copies deployed are removed from the pool/hand and get added to the board.

### Pool

The Pool contains unit copies in randomized order that did not make it into the player's hand. When a copy gets in to the Hand, it is removed from the Pool. If the hand is re-rolled, the units that were in the hand move to the Discarded Pool, while units from the top of the Pool fill the new hand. Once this Pool runs out of Unit Copies, Discarded Pool is shuffled back to the Pool.

### **Discarded Pool**

The discarded Pool are all unit copies that were re-rolled or sold. After Pool is empty Discarded Pool is shuffled back to the Pool.

### Re-Rolls

Re-roll is a currency used to refresh player hand. At the start of the game player gets 2 Re-rolls and +1 Re-Roll each round.

### Selling

When unit is originally placed, it can still be Moved and Sold before they are locked during **Battle Phase GO!**. When unit is sold, player gets back resources they used and Unit copy goes to the Discarded Pool. *(resources include upgrades if the unit was upgraded the same round it was placed)*

# Units

In the Deploy Phase, players place units on the battlefield. During the Battle Phase, each unit uses path-finding to find and fight enemy units automatically.

*general (why place them this way, why don’t disappear, why positioning matters)*

## Upgrades

Upgrades are special abilities unit can obtain during the battle. To Upgrade a unit player have to place copy of the already placed unit on the board, then player can choose between 3 different upgrades. Player can only upgrade unit twice, as Backpack only contains 3 Copies of each unit.

# Terrain

Terrain as a obstacles appearing on the board, which can block vision, restrict movement, etc. Obstacles are prearranged into Map layouts.

There are 2 Types of obstacles Field & Cube.

**Cube**: Occupies a tile, so units can’t be placed there. Also takes damage

**Field**: Affects the tile itself. Does not take damage

# Artifacts

Artifacts are **limited** items, with *mainly*  **temporary** effects, that player can place on the board during **Deploy Phase**.
