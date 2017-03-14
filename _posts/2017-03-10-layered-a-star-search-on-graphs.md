---
layout: monochrome-default
type: ma-thesis
title: Improving A* Search on Public Transit Graphs - First Take
---
# Motivation
A* Search is an algorithm that uses heuristics to speed up shortest path queries. To make a correct query with A* from $$s$$ to $$t$$  on a Graph $$G=(V, E)$$ we need a heuristic  $$\pi_t(v)$$ that is a lower bound for the real distance to t: $$\forall v\in V:  \pi_t(v) \leq dist(v, t)$$. The better $$\pi_t(v)$$ is (= the bigger the heuristic value is), the better is the speedup. 

Graphs with public transit (Public Transit Graphs, *PTG*) have edges for fast connections that only operate a few times a day. This means that depending on the departure time, the travel time of the edge is either very short or very long (if you depart shortly before the train departs, you can take the train, if you depart after the train departed you either have to wait for the next connection or you have to walk). This makes it hard to find good lower bounds of such edges due to their high fluctuation of their travel time. Consequently, A* does not result in a good speedup on such graphs.

The main idea of this approach is to identify a set of edges $$L_1 \subset E$$ with a high fluctuation of travel time and to find a good heuristic for $$\underline{G}=(V, E \setminus L_1)$$. We can then query differently on these two sets using a combination of A* in $$\underline{G}$$ and Dijkstra in $$\overline{G}=(V, L_1)$$ ... *or something like that **@TODO**.

# Assumptions & Conditions
> Given a graph $$G=(V,E)$$ 
> 
> Given a subset $$L_0 \subseteq E$$ 
> 
> Given a subset $$L_1 \subseteq E$$ with $$L_0 \cap L_1 = \emptyset$$ 
> 
> and we define $$L_{0,1} = L^*=(E \setminus L_0)\setminus L_1$$

### Levels of Layers and Edges
We also call the subsets $$L_i$$ **layers with level $$i$$**.

We define **levels of edges $$e_i$$ in a path** as follows:
> $$
> level(e_i) =
> \begin{cases}
> 0,  &e\in L_0 \vee i=0 \\
> 1, &e\in L_1\\
> level(e_{i-1}), & e\in L^* 
> \end{cases}
> $$

For $$L_0$$ and $$L_1$$ the **layer condition** holds:
> $$\forall \text{ shortest paths } P=(e_0, e_1, \dots , e_k) \text{ }\exists l,k: l \leq k \text{ with} \\
> \\
> level(e_i) =
> \begin{cases}
> 0,  & i \lt l\\
> 1, & l \leq i \lt l\\
> 0, & k \leq i
> \end{cases}
> $$

alternatively: 
> $$
> \begin{align}
> \forall \text{ shortest paths } P :
> P & = \underline{P_s} + \overline{P} + \underline{P_t} \\
> & = (e_{0} \,, \dots \,, e_{h})+(E_0, \dots \,, E_k)+(\tilde{e_{0}}\,, \dots \,, \tilde{e_{l}}) \text{ with} \end{align}$$
> * $$level(e_i) = 0$$ 
> * $$level(\tilde{e_i}) = 1$$
> * $$level(E_i) = 0$$
> * $$len(\underline{P_s}, \overline{P}, \underline{P_t} \geq 0)$$

### Heuristics

We also require a heuristic $$\pi_t(v, l)$$:
> * $$\pi_t(v,1) = 0\quad \text{, } \forall v \in V$$
> * $$\pi_t(v,0)$$ is an admissable heuristic with $$\pi_t(t, 0)=0$$

# First Take: The most naive and _Simple PTG-A*_
`Q` is a priority function, `pi(v,l)` is a heuristic function, `d[v]` shortest distance to `v` found
{% highlight cpp linenos%}
Q.clear()
Q.add(s, 0, 0, pi(s,0))
while(!Q.empty()) 
    u, l_max, l_curr, dist = Q.pop()
    for (e=(u,v) : outgoingEdges(u)) 
        if (d[u] + len(e) < d[v]) 
            l_edge = level(e, l_curr)
            // stay in same level
            if (l_curr == l_edge) 
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_curr, d[v] + pi(v, l_edge))
            // ascend to higher level (if it was not visited yet)
            else if (l_curr < l_edge && l_max < l_edge) {
                d[v] = d[u] + len(e)
                Q.update(v, l_edge, l_edge, d[v] + pi(v, l_edge))
            // descend to lower level
            else if (l_curr > l_edge && l_max <= l_curr) {
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_edge, d[v] + pi(v, l_edge))
{% endhighlight %}

The Algorithm is a normal A* search algorithm on edges $$e \in L_0$$ and a normal Dijkstra on edges $$e \in L_1$$. The edges $$e \in L^*$$ are considered as edges from either $$L_0$$ or $$L_1$$ depending on what the current level is.　_Note, that there is no stopping criteria whatsover yet und the current approach will check and try to relax all reachable edges._

## Correctness
Is PTG-A* correct and finds the shortest path from $$s$$ to $$t$$? Intuition says yes. There's not stopping criteria. We're doing A* or Dijsktra on the whole graph and we should find the shortest path between $$s$$ and $$t$$ because of line `7`:
```
d[v] = d[u] + len(e)
```

#### Case 1: Shortest path $$P=\underline(P_s)$$

A* is correct.

#### Case 2: Shortest path $$P=\underline{P_s} + \overline{P}$$

A*, then correct Dijsktra.

#### Case 3: Shortest path $$P=\underline{P_s} + \overline{P} + \underline{P_t}$$

A*, then Dijkstra, then A*.

### Corollar Shortest-Path-Order

> Let $$P=(e_0 = (s, v_0), \dots, e_k = (v_{k-1}, t))$$ be a shortest path from $$s$$ to $$t$$. For every vertex $$v_i$$ it is $$key(v_i)\leq key(v_{i+1})$$.

Proof: 
> $$\begin{align}
> key(v_i) & \leq key(v_{i+1})\\
> \Leftrightarrow len(e_0, ..., e_{i}) + \pi_t(v_i) & \leq len(e_0, ..., e_{i}, e_{i+1}) + \pi_t(v_{i+1})\\
> \Leftrightarrow \pi_t(v_i) & \leq len(e_{i+1}) + \pi_t(v_{i+1})\\
> \Leftrightarrow 0 & \leq len(e_{i+1}) - \pi_t(v_i) + \pi_t(v_{i+1})
> \end{align}$$
 
Which is exactly the definition of feasibility of heuristics!

# Second Take: Stopping _PTG-A*_
_Simple PTG-A*_ is basically a mix of a Dijsktra and A* that traverses the whole graph and all its edges. Can we stop the search after relaxing our target $$t$$? Namely, can we add line `5` as follows?

{% highlight cpp linenos%}
Q.clear()
Q.add(s, 0, 0, pi(s,0))
while(!Q.empty()) 
    u, l_max, l_curr, dist = Q.pop()
    if (u == t) break
    for (e=(u,v) : outgoingEdges(u)) 
        if (d[u] + len(e) < d[v]) 
            l_edge = level(e, l_curr)
            // stay in same level
            if (l_curr == l_edge) 
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_curr, d[v] + pi(v, l_edge))
            // ascend to higher level (if it was not visited yet)
            else if (l_curr < l_edge && l_max < l_edge) {
                d[v] = d[u] + len(e)
                Q.update(v, l_edge, l_edge, d[v] + pi(v, l_edge))
            // descend to lower level
            else if (l_curr > l_edge && l_max <= l_curr) {
                d[v] = d[u] + len(e)
                Q.update(v, l_max, l_edge, d[v] + pi(v, l_edge))
{% endhighlight %}

## Correctness

We will find a proof by contradiction:

### Case 1: Shortest path $$P$$ with $$level(P) = 0$$
Let $$\hat{P} \neq P$$ be the shortest path found by _PTA-A*_ and $$len(\hat{P})\gt len(P)$$. 

If $$\forall e \in \hat{P}: e \in L_0 \cup L^*$$ it is a contradiction to the correctness of A\*. Therefore, $$\exists \hat{e}=(u,v)\in \hat{P} : \hat{e} \in L_1$$. With no loss of generality we assume 

> $$\hat{P} = P_{whatever} + \overline{P} + \underline{P}$$

with $$level(\overline{P}) = 1$$ and $$level(\underline{P}) = 0$$.

#### If $$|\underline{P}| \gt 0$$

![bla](/master_thesis/img/ptg-a-correctness1.png)

**@TODO why are IPE PNGs so awful?**

Let vertex $$w$$ be the first vertex that is in $$\hat{P} \cap P$$. Vertex $$v$$ definitely exists because vertex $$t \in \underline{P} \cap P$$.
Let $$\hat{e}=(v,w)\in \hat{P}$$ and $$e=(u,w)\in P$$. When $$\hat{e}$$ is relaxed, vertex $$w$$ will be updated in the queue with $$\widehat{key}(w)=len(\hat{P}(s,w)) + \pi_t(w)$$. But when relaxing edge $$e$$, vertex $$w$$ will be updated with $$key(w) = len(P(s,w)) + \pi_t(w) \leq \widehat{key}(w)$$. As the key values in $$P$$ are monotonically increasing and $$key(w)$$ is smaller than $$\widehat{key}(w)$$ it will be extracted from the queue before with the correct distance. This is a contradiction ↯

#### If $$|\underline{P}| = 0$$

![bla](/master_thesis/img/ptg-a-correctness2.png)

Let edge $$\hat{e}=(v,t)$$ be the last edge in $$\hat{P}$$ and edge $$e=(u,t)$$ the last edge in $$P$$. When $$\hat{e}$$ is relaxed, vertex $$t$$ will be updated in the queue with $$\widehat{key}(t) = len(\hat{P} \geq dist(s,t))$$. 
But when relaxing edge $$e$$, vertex $$t$$ will be updated with $$key(t) = len(P) = dist(s,t) \leq \widehat{key}(t)$$. As the key values in $$P$$ are monotonically increasing and $$key(w)$$ is smaller than $$\widehat{key}(w)$$ it will be popped (?) from the queue before with the correct distance. This is a contradiction ↯

### Case 2: Shortest path $$P = \underline{P_s} + \overline{P} + \underline{P_t}$$

The proof in Case 1 makes use of the fact that key values in a shortest path are monotonically increasing. More importantly, when a vertex with key of value $$x$$ is extracted from the queue and $$key(e_i) \leq x$$, then we can be sure that all vertices $$e_j, j \lt i$$ were already relaxed before. How does this change with a shortest Path that has edges from $$L_1$$.

### Observations of Key Values on Shortest Paths $$P = \underline{P_s} + \overline{P} + \underline{P_t}$$

> 1. When relaxing edges $$E_i \in \overline{P}$$ the key values are always smaller than edges $$e_i \in \overline{P_t}$$
> 2. $$key(E_i) \leq key(E_{i+1})$$
> 3. `1`+`2` $$\Rightarrow \overline{P} + \underline{P_t}$$ is monotonically increasing
> 4. But we know the key values when visiting $$\underline{P_s}$$ and $$\underline{P_t}$$ are also increasing. This means that as soon we relax an edge $$e$$ from $$\overline{P}$$, we will find the path $$P(s, e)$$

Let $$\hat{P} \neq P$$ be the shortest path found by _PTA-A*_ and $$len(\hat{P})\gt len(P)$$. Let edge $$e=(u,v)$$ be the last edge of $$\underline{P_s}$$.

![bla](/master_thesis/img/ptg-a-correctness3.png)

It is $$\hat{P} = \underline{\hat{P}_s} + \overline{\hat{P}}$$. Vertex $$t$$ was found and relaxed when extracting $$t$$ with $$\widehat{key}(t) = \hat{d}[t] = len(\hat{P}(s, t))$$. We know $$\widehat{key}(t) \leq key(v)=len(P(s, v)) + \pi_t(v) \gt dist(s,t)$$ because otherwise (see the key value observations) the PTG-A* would have found the shortest path $$P$$.

But when relaxing edge $$e$$ we update vertex $$v$$ with $$key(v) = len(P(s,v)) + \pi_t(v) \leq dist(s,t)$$ so it has to be extracted before vertex $$t$$ is extracted through path $$\hat{P}$$. This is a contradiction ↯


