<?php

test('returns a successful response', function () {
    $response = $this->get(route('coordinates.index'));

    $response->assertOk();
});
